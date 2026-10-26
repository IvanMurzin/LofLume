import { useI18n } from './I18n.tsx';
import { useEffect, useRef } from 'react';
import type { Cassette } from './cassettes.ts';

export type ExternalPhase = 'loading' | 'waiting' | 'playing' | 'paused' | 'error';
export type ExternalControls = { toggle: () => void; previous?: () => void; next?: () => void };
type YouTubePlayer = { playVideo(): void; pauseVideo(): void; getPlayerState(): number; setVolume(value: number): void; destroy(): void };
type SpotifyController = { play(): void; togglePlay(): void; destroy(): void; addListener(event: string, callback: (event: { data: { isPaused: boolean } }) => void): void };
type SpotifyAPI = { createController(element: HTMLElement, options: { uri: string; width: string; height: number }, callback: (controller: SpotifyController) => void): void };
declare global {
  interface Window {
    YT?: { Player: new (element: HTMLElement, options: { width: string; height: string; videoId?: string; playerVars: Record<string, string | number>; events: { onReady(event: { target: YouTubePlayer }): void; onStateChange(event: { data: number }): void; onError(): void; onAutoplayBlocked(): void } }) => YouTubePlayer };
    onYouTubeIframeAPIReady?: () => void;
    onSpotifyIframeApiReady?: (api: SpotifyAPI) => void;
  }
}
let youtubeScript: Promise<void> | undefined;
let spotifyScript: Promise<SpotifyAPI> | undefined;
function youtubeAPI(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return youtubeScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    const fail = () => { clearTimeout(timeout); script.remove(); youtubeScript = undefined; reject(new Error('YouTube unavailable')); };
    const timeout = setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = () => { clearTimeout(timeout); resolve(); };
    script.src = 'https://www.youtube.com/iframe_api'; script.async = true; script.onerror = fail; document.head.append(script);
  });
}
function spotifyAPI(): Promise<SpotifyAPI> {
  return spotifyScript ??= new Promise<SpotifyAPI>((resolve, reject) => {
    const script = document.createElement('script');
    const fail = () => { clearTimeout(timeout); script.remove(); spotifyScript = undefined; reject(new Error('Spotify unavailable')); };
    const timeout = setTimeout(fail, 15000);
    window.onSpotifyIframeApiReady = api => { clearTimeout(timeout); resolve(api); };
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'; script.async = true; script.onerror = fail; document.head.append(script);
  });
}

type Props = { tape: Cassette; volume: number; onPhase: (phase: ExternalPhase) => void; onControls: (controls: ExternalControls | null) => void };
export function ExternalPlayer({ tape, volume, onPhase, onControls }: Props) {
  const { t } = useI18n();
  const host = useRef<HTMLDivElement>(null);
  const youtube = useRef<YouTubePlayer | null>(null);
  const yandexFrame = useRef<HTMLIFrameElement>(null);
  const yandexState = useRef({ playing: false, started: false });
  const frameLoaded = useRef<() => void>(() => {});
  const volumeRef = useRef(volume);
  volumeRef.current = volume;
  useEffect(() => { youtube.current?.setVolume(Math.round(volume * 100)); }, [volume]);
  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;
    onPhase('loading'); onControls(null);
    const timeout = setTimeout(() => { if (!cancelled) onPhase('error'); }, 18000);
    const ready = () => { clearTimeout(timeout); if (!cancelled) onPhase('waiting'); };
    frameLoaded.current = ready;
    const failed = () => { clearTimeout(timeout); if (!cancelled) onPhase('error'); };
    let removeYandexListener: (() => void) | undefined;
    if (tape.provider === 'yandex') {
      const send = (type: string) => yandexFrame.current?.contentWindow?.postMessage({ source: 'EXTERNAL_PLAYER', type }, 'https://music.yandex.ru');
      yandexState.current = { playing: false, started: false };
      const receive = (event: MessageEvent) => {
        if (cancelled || event.origin !== 'https://music.yandex.ru' || event.source !== yandexFrame.current?.contentWindow) return;
        const data: unknown = event.data;
        if (!data || typeof data !== 'object' || !('source' in data) || data.source !== 'YANDEX_MUSIC' || !('type' in data)) return;
        if (data.type === 'READY') {
          ready();
          onControls({ toggle: () => send(yandexState.current.playing ? 'PAUSE' : yandexState.current.started ? 'RESUME' : 'PLAY_SOURCE'), previous: () => send('PREVIOUS_TRACK'), next: () => send('NEXT_TRACK') });
          if (volumeRef.current > 0) send('PLAY_SOURCE');
        } else if (data.type === 'STATE' && 'payload' in data && data.payload && typeof data.payload === 'object' && 'status' in data.payload) {
          const status = data.payload.status;
          if (status === 'PLAYING') { yandexState.current = { playing: true, started: true }; onPhase('playing'); }
          else if (['PAUSED', 'STOPPED', 'ENDED'].includes(String(status))) { yandexState.current.playing = false; onPhase('paused'); }
          else if (status === 'ERROR') failed();
        } else if (data.type === 'ERROR') failed();
      };
      window.addEventListener('message', receive);
      removeYandexListener = () => window.removeEventListener('message', receive);
    } else if (tape.provider === 'youtube') {
      void youtubeAPI().then(() => {
        if (cancelled || !host.current || !window.YT) return;
        const mount = document.createElement('div'); host.current.replaceChildren(mount);
        const player = new window.YT.Player(mount, {
          width: '100%', height: '200', videoId: tape.videoId,
          playerVars: { playsinline: 1, origin: window.location.origin, ...(tape.listId ? { list: tape.listId, listType: 'playlist' } : {}) },
          events: {
            onReady: ({ target }) => {
              if (cancelled) return;
              youtube.current = target; ready(); target.setVolume(Math.round(volumeRef.current * 100));
              onControls({ toggle: () => { if (target.getPlayerState() === 1) target.pauseVideo(); else target.playVideo(); } });
              const frame = host.current?.querySelector('iframe');
              if (frame) frame.setAttribute('allow', "autoplay; encrypted-media; fullscreen; picture-in-picture 'none'");
              target.playVideo();
            },
            onStateChange: ({ data }) => { if (!cancelled) { if (data === 1) onPhase('playing'); else if (data === 2 || data === 0) onPhase('paused'); } },
            onError: failed, onAutoplayBlocked: ready,
          },
        });
        destroy = () => player.destroy();
      }).catch(failed);
    } else if (tape.provider === 'spotify') {
      void spotifyAPI().then(api => {
        if (cancelled || !host.current) return;
        const mount = document.createElement('div'); host.current.replaceChildren(mount);
        api.createController(mount, { uri: tape.spotifyUri!, width: '100%', height: 152 }, controller => {
          if (cancelled) { controller.destroy(); return; }
          const frame = host.current?.querySelector('iframe');
          if (frame) frame.setAttribute('allow', "autoplay; encrypted-media; fullscreen; picture-in-picture 'none'");
          destroy = () => controller.destroy();
          controller.addListener('ready', () => { if (!cancelled) { ready(); onControls({ toggle: () => controller.togglePlay() }); if (volumeRef.current > 0) controller.play(); } });
          controller.addListener('playback_update', event => { if (!cancelled) { clearTimeout(timeout); onPhase(event.data.isPaused ? 'paused' : 'playing'); } });
        });
      }).catch(failed);
    }
    return () => {
      cancelled = true; clearTimeout(timeout);
      removeYandexListener?.(); onControls(null); youtube.current = null;
      try { destroy?.(); } catch { /* Removing the frame still stops playback. */ }
      host.current?.replaceChildren();
    };
  }, [tape, onControls, onPhase]);
  // The widget retains its own authentication, licensing and account checks.
  const yandexUrl = new URL(tape.embedUrl);
  if (tape.provider === 'yandex') { yandexUrl.searchParams.set('display', 'bandlink-wiki'); yandexUrl.searchParams.set('parentOrigin', window.location.origin); }
  return tape.provider === 'yandex'
    ? <iframe ref={yandexFrame} className="external-frame" src={yandexUrl.href} title={t('yandexTitle', { name: tape.name })} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture 'none'" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => frameLoaded.current()} onError={() => onPhase('error')} />
    : <div className="external-player-host" ref={host} />;
}
