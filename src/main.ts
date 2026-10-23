import './style.css';

const scene = document.querySelector<HTMLDivElement>('#scene')!;
const image = document.querySelector<HTMLImageElement>('#scene-image')!;
const landmarks = document.querySelector<SVGGElement>('#landmarks')!;
const explore = document.querySelector<HTMLButtonElement>('#explore')!;
const fullscreen = document.querySelector<HTMLButtonElement>('#fullscreen')!;
const status = document.querySelector<HTMLParagraphElement>('#status')!;
const imageError = document.querySelector<HTMLDivElement>('#image-error')!;

const roomObjects = document.querySelector<SVGSVGElement>('#room-objects')!;
const EXPLORE_DURATION_MS = 4200;
let exploreTimeout: ReturnType<typeof setTimeout> | undefined;
landmarks.removeAttribute('hidden');

function hideLandmarks(): void {
  clearTimeout(exploreTimeout);
  roomObjects.classList.remove('is-exploring');
  explore.setAttribute('aria-pressed', 'false');
}

function showLandmarks(): void {
  clearTimeout(exploreTimeout);
  roomObjects.classList.add('is-exploring');
  explore.setAttribute('aria-pressed', 'true');
  exploreTimeout = setTimeout(hideLandmarks, EXPLORE_DURATION_MS);
}

// Repeated clicks renew the reading time rather than abruptly hiding the notes.
explore.addEventListener('click', showLandmarks);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideLandmarks();
});

function updateSceneRatio(): void {
  if (image.naturalWidth && image.naturalHeight) {
    scene.style.setProperty('--scene-ratio', String(image.naturalWidth / image.naturalHeight));
  }
  imageError.hidden = true;
}
image.addEventListener('load', updateSceneRatio);
image.addEventListener('error', () => { imageError.hidden = false; });
if (image.complete && image.naturalWidth) updateSceneRatio();
else if (image.complete) imageError.hidden = false;
document.querySelector<HTMLButtonElement>('#retry-image')!.addEventListener('click', () => {
  imageError.hidden = true;
  image.src = `/assets/cozy-coding-v3.webp?retry=${Date.now()}`;
});

if (!document.fullscreenEnabled) fullscreen.hidden = true;
fullscreen.addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    status.textContent = 'Браузер не разрешил полноэкранный режим.';
  }
});
document.addEventListener('fullscreenchange', () => {
  const label = document.fullscreenElement ? 'Выйти из полного экрана' : 'На весь экран';
  fullscreen.setAttribute('aria-label', label);
  fullscreen.title = label;
});

// CSS owns the decorative loops. Hidden pages freeze them without a render loop.
function syncSceneVisibility(): void {
  document.documentElement.toggleAttribute('data-scene-paused', document.hidden);
  if (document.hidden) hideLandmarks();
}
document.addEventListener('visibilitychange', syncSceneVisibility);
window.addEventListener('pagehide', () => document.documentElement.setAttribute('data-scene-paused', ''));
window.addEventListener('pageshow', syncSceneVisibility);
syncSceneVisibility();

import { initMusic } from './music-ui.ts';
const disposeMusic = initMusic();
if (import.meta.hot) import.meta.hot.dispose(disposeMusic);
