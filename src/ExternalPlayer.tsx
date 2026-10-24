import { useEffect, useRef } from 'react';
import type { Cassette } from './cassettes.ts';

export type ExternalPhase = 'loading' | 'waiting' | 'playing' | 'paused' | 'error';
export type ExternalControls = { toggle: () => void };
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
  const host = useRef<HTMLDivElement>(null);
  const youtube = useRef<YouTubePlayer | null>(null);
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
    const hidden = () => { if (document.hidden) youtube.current?.pauseVideo(); };
    document.addEventListener('visibilitychange', hidden);
    if (tape.provider === 'youtube') {
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
              if (!document.hidden) target.playVideo();
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
          destroy = () => controller.destroy();
          controller.addListener('ready', () => { if (!cancelled) { ready(); onControls({ toggle: () => controller.togglePlay() }); if (volumeRef.current > 0) controller.play(); } });
          controller.addListener('playback_update', event => { if (!cancelled) { clearTimeout(timeout); onPhase(event.data.isPaused ? 'paused' : 'playing'); } });
        });
      }).catch(failed);
    }
    return () => {
      cancelled = true; clearTimeout(timeout); document.removeEventListener('visibilitychange', hidden);
      onControls(null); youtube.current = null;
      try { destroy?.(); } catch { /* Removing the frame still stops playback. */ }
      host.current?.replaceChildren();
    };
  }, [tape, onControls, onPhase]);
  // React owns the Yandex iframe; it is removed on eject. There is no assumed pause API.
  return tape.provider === 'yandex'
    ? <iframe className="external-frame" src={tape.embedUrl} title={`Яндекс Музыка — ${tape.name}`} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => frameLoaded.current()} onError={() => onPhase('error')} />
    : <div className="external-player-host" ref={host} />;
}
