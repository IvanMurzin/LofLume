import { SceneMusic } from './music.ts';
import { tracks } from './tracks.ts';

export function initMusic(): () => void {
  const radio = document.querySelector<SVGGElement>('[data-object="music"]')!;
  const panel = document.querySelector<HTMLElement>('#music-panel')!;
  const audio = document.querySelector<HTMLAudioElement>('#scene-audio')!;
  const play = document.querySelector<HTMLButtonElement>('#music-play')!;
  const next = document.querySelector<HTMLButtonElement>('#music-next')!;
  const close = document.querySelector<HTMLButtonElement>('#music-close')!;
  const title = document.querySelector<HTMLElement>('#music-title')!;
  const artist = document.querySelector<HTMLElement>('#music-artist')!;
  const message = document.querySelector<HTMLElement>('#music-message')!;
  const volume = document.querySelector<HTMLInputElement>('#music-volume')!;
  const volumeValue = document.querySelector<HTMLOutputElement>('#music-volume-value')!;
  const trackNumber = document.querySelector<HTMLElement>('#music-track-number')!;
  const credits = document.querySelector<HTMLUListElement>('#music-credits')!;
  let savedVolume = .45;
  try {
    const saved = localStorage.getItem('loflume.music.volume');
    if (saved !== null && Number.isFinite(Number(saved))) savedVolume = Number(saved);
  } catch { /* Playback does not depend on browser storage. */ }
  const player = new SceneMusic(audio, tracks, savedVolume);

  for (const track of tracks) {
    const item = document.createElement('li');
    const source = document.createElement('a');
    source.textContent = `${track.title} — ${track.artist}`;
    source.href = track.source;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    item.append(source, document.createTextNode(` · ${track.license}`));
    credits.append(item);
  }

  const unsubscribe = player.subscribe(state => {
    title.textContent = state.track.title;
    artist.textContent = state.track.artist;
    trackNumber.textContent = `${state.index + 1} / ${tracks.length}`;
    const active = state.phase === 'playing' || state.phase === 'loading';
    play.textContent = state.phase === 'error' ? 'Попробовать ещё раз' : active ? 'Пауза' : 'Включить';
    play.setAttribute('aria-label', state.phase === 'error' ? 'Повторить запуск музыки' : active ? 'Пауза' : 'Включить музыку');
    panel.dataset.phase = state.phase;
    radio.classList.toggle('is-playing', state.phase === 'playing');
    radio.setAttribute('aria-label', state.phase === 'playing' ? 'Радио — музыка играет' : 'Радио — включить музыку');
    message.textContent = state.error ?? (state.phase === 'loading' ? 'Настраиваем волну…' : state.phase === 'playing' ? 'Тихая музыка для твоего вечера' : 'Lo-fi без спешки');
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
  next.addEventListener('click', () => player.next());
  volume.addEventListener('input', () => {
    player.setVolume(Number(volume.value) / 100);
    try { localStorage.setItem('loflume.music.volume', String(player.state.volume)); } catch { /* Optional. */ }
  });
  return () => { unsubscribe(); player.dispose(); };
}
