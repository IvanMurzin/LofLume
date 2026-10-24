import { SceneMusic } from './music.ts';
import { tracks } from './tracks.ts';

export function initMusic(): () => void {
  const radio = document.querySelector<SVGGElement>('[data-object="music"]')!;
  const panel = document.querySelector<HTMLElement>('#music-panel')!;
  const audio = document.querySelector<HTMLAudioElement>('#scene-audio')!;
  const play = document.querySelector<HTMLButtonElement>('#music-play')!;
  const close = document.querySelector<HTMLButtonElement>('#music-close')!;
  const title = document.querySelector<HTMLElement>('#music-title')!;
  const artist = document.querySelector<HTMLElement>('#music-artist')!;
  const message = document.querySelector<HTMLElement>('#music-message')!;
  const volume = document.querySelector<HTMLInputElement>('#music-volume')!;
  const volumeValue = document.querySelector<HTMLOutputElement>('#music-volume-value')!;
  const nowPlaying = document.querySelector<HTMLElement>('#now-playing')!;
  const quickToggle = document.querySelector<HTMLButtonElement>('#radio-toggle')!;
  const quickIcon = document.querySelector<SVGPathElement>('#radio-toggle-icon')!;
  const ticker = nowPlaying.querySelector<HTMLElement>('.ticker-viewport')!;
  const radioStatus = document.querySelector<HTMLElement>('#radio-status')!;
  let displayedTrack = '';
  let savedVolume = .45;
  try {
    const saved = localStorage.getItem('loflume.music.volume');
    if (saved !== null && Number.isFinite(Number(saved))) savedVolume = Number(saved);
  } catch { /* Playback does not depend on browser storage. */ }
  const player = new SceneMusic(audio, tracks, savedVolume);

  const unsubscribe = player.subscribe(state => {
    title.textContent = state.track.title;
    artist.textContent = state.track.artist;
    const playing = state.phase === 'playing';
    const active = playing || state.phase === 'loading';
    nowPlaying.hidden = state.phase === 'idle';
    ticker.hidden = !playing;
    radioStatus.hidden = playing;
    radioStatus.textContent = state.phase === 'loading' ? 'Загрузка…' : state.phase === 'error' ? 'Повторить запуск' : 'Радио на паузе';
    quickToggle.setAttribute('aria-label', state.phase === 'error' ? 'Повторить запуск музыки' : active ? 'Пауза' : 'Включить музыку');
    quickToggle.title = quickToggle.getAttribute('aria-label')!;
    quickIcon.setAttribute('d', active ? 'M7 5v10M13 5v10' : 'M7 4l9 6-9 6Z');
    if (displayedTrack !== state.track.id) {
      displayedTrack = state.track.id;
      for (const name of nowPlaying.querySelectorAll('.ticker-title')) name.textContent = state.track.title;
      for (const link of nowPlaying.querySelectorAll<HTMLAnchorElement>('.ticker-artist')) {
        link.textContent = state.track.artist;
        link.href = state.track.artistUrl ?? state.track.source;
      }
    }
    nowPlaying.setAttribute('aria-label', playing ? 'Сейчас играет: ' + state.track.title + ' — ' + state.track.artist : 'Радио LofLume');
    play.textContent = state.phase === 'error' ? 'Попробовать ещё раз' : active ? 'Пауза' : 'Включить';
    play.setAttribute('aria-label', state.phase === 'error' ? 'Повторить запуск музыки' : active ? 'Пауза' : 'Включить музыку');
    panel.dataset.phase = state.phase;
    radio.classList.toggle('is-playing', state.phase === 'playing');
    radio.setAttribute('aria-label', state.phase === 'playing' ? 'Радио — музыка играет' : 'Радио — включить музыку');
    message.textContent = state.error ?? (state.phase === 'loading' ? 'Загрузка…' : '');
    message.hidden = !message.textContent;
    volume.value = String(Math.round(state.volume * 100));
    volumeValue.value = `${Math.round(state.volume * 100)}%`;
  });

  function openPanel(): void {
    panel.hidden = false;
    radio.setAttribute('aria-expanded', 'true');
    if (player.state.phase === 'idle') void player.play();
    play.focus({ preventScroll: true });
  }
  function closePanel(returnFocus = true): void {
    if (panel.hidden) return;
    panel.hidden = true;
    radio.setAttribute('aria-expanded', 'false');
    if (returnFocus) radio.focus({ preventScroll: true });
  }
  radio.addEventListener('click', openPanel);
  radio.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPanel(); }
  });
  close.addEventListener('click', () => closePanel());
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePanel(); });
  document.addEventListener('pointerdown', event => {
    const target = event.target;
    if (target instanceof Node && !panel.contains(target) && !radio.contains(target)) closePanel(false);
  });
  play.addEventListener('click', () => player.toggle());
  quickToggle.addEventListener('click', () => player.toggle());
  volume.addEventListener('input', () => {
    player.setVolume(Number(volume.value) / 100);
    try { localStorage.setItem('loflume.music.volume', String(player.state.volume)); } catch { /* Optional. */ }
  });
  return () => { unsubscribe(); player.dispose(); };
}
