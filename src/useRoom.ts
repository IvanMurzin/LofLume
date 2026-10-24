import { useCallback, useEffect, useRef, useState } from 'react';

export function useRoom() {
  const [exploring, setExploring] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [status, setStatus] = useState('');
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('/assets/cozy-coding-v3.webp');
  const [ratio, setRatio] = useState(1672 / 941);
  const imageRef = useRef<HTMLImageElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideLandmarks = useCallback(() => {
    clearTimeout(timeout.current);
    setExploring(false);
  }, []);
  const imageLoaded = useCallback(() => {
    const image = imageRef.current;
    if (image?.naturalWidth && image.naturalHeight) setRatio(image.naturalWidth / image.naturalHeight);
    setImageError(false);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') hideLandmarks(); };
    const onFullscreen = () => setFullscreen(!!document.fullscreenElement);
    const syncVisibility = () => {
      document.documentElement.toggleAttribute('data-scene-paused', document.hidden);
      if (document.hidden) hideLandmarks();
    };
    const onPageHide = () => document.documentElement.setAttribute('data-scene-paused', '');
    document.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFullscreen);
    document.addEventListener('visibilitychange', syncVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', syncVisibility);
    syncVisibility();
    const image = imageRef.current;
    if (image?.complete) {
      if (image.naturalWidth) imageLoaded();
      else setImageError(true);
    }
    return () => {
      clearTimeout(timeout.current);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFullscreen);
      document.removeEventListener('visibilitychange', syncVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', syncVisibility);
    };
  }, [hideLandmarks, imageLoaded]);
  return {
    exploring, fullscreen, status, imageError, imageSrc, ratio, imageRef, imageLoaded,
    imageFailed() { setImageError(true); },
    retryImage() { setImageError(false); setImageSrc(`/assets/cozy-coding-v3.webp?retry=${Date.now()}`); },
    showLandmarks() {
      clearTimeout(timeout.current);
      setExploring(true);
      timeout.current = setTimeout(hideLandmarks, 4200);
    },
    async toggleFullscreen() {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch { setStatus('Браузер не разрешил полноэкранный режим.'); }
    },
  };
}
