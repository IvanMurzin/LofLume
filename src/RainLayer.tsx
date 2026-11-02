import { useEffect, useRef } from 'react';
import { rainOpening, rainShelter } from './cafeRain.ts';

export function RainLayer({ enabled }: { enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const mask = document.createElement('canvas');
    const maskCtx = mask.getContext('2d')!;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, previous = 0, elapsed = 0, disposed = false;
    // Stable random layout: no flicker on resize or repeated frames.
    let seed = 81031;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    const drops = Array.from({ length: 720 }, () => ({ x: random() * 1672, y: random() * 941, speed: 155 + random() * 175, length: 11 + random() * 15, opacity: .32 + random() * .28 }));
    function resize() {
      const width = Math.max(1, Math.round(canvas.clientWidth * Math.min(devicePixelRatio || 1, 1.5)));
      const height = Math.max(1, Math.round(width * 941 / 1672));
      canvas.width = mask.width = width; canvas.height = mask.height = height;
      maskCtx.setTransform(width / 1672, 0, 0, height / 941, 0, 0);
      maskCtx.fillStyle = '#fff'; maskCtx.fill(new Path2D(rainOpening));
      maskCtx.globalCompositeOperation = 'destination-out';
      for (const path of rainShelter) maskCtx.fill(new Path2D(path));
      maskCtx.globalCompositeOperation = 'source-over';
      // Feather the top/bottom boundary so rain doesn't form a hard rectangle.
      maskCtx.globalCompositeOperation = 'destination-in';
      const fade = maskCtx.createLinearGradient(0, 158, 0, 630);
      fade.addColorStop(0, 'transparent'); fade.addColorStop(.12, 'white'); fade.addColorStop(.89, 'white'); fade.addColorStop(1, 'transparent');
      maskCtx.fillStyle = fade; maskCtx.fillRect(0, 0, 1672, 941);
      maskCtx.globalCompositeOperation = 'source-over';
      paint();
    }
    function paint() {
      if (!ctx) return;
      ctx.setTransform(canvas.width / 1672, 0, 0, canvas.height / 941, 0, 0);
      ctx.clearRect(0, 0, 1672, 941);
      ctx.lineCap = 'round';
      for (const drop of drops) {
        const y = (drop.y + elapsed * drop.speed) % 941;
        const x = (drop.x - elapsed * 19 % 1672 + 1672) % 1672;
        ctx.strokeStyle = `rgba(209,224,226,${drop.opacity})`;
        ctx.lineWidth = .9;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 1.5, y + drop.length); ctx.stroke();
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(mask, 0, 0); ctx.globalCompositeOperation = 'source-over';
    }
    function tick(now: number) {
      if (disposed || document.hidden || motion.matches) return;
      if (!previous) previous = now;
      if (now - previous >= 1000 / 30) {
        elapsed += Math.min((now - previous) / 1000, .1); previous = now; paint();
      }
      frame = requestAnimationFrame(tick);
    }
    function refresh() {
      cancelAnimationFrame(frame); previous = 0;
      if (!document.hidden && !motion.matches) frame = requestAnimationFrame(tick);
      else if (!document.hidden) paint();
    }
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    document.addEventListener('visibilitychange', refresh); motion.addEventListener('change', refresh);
    resize(); refresh();
    return () => { disposed = true; cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', refresh); motion.removeEventListener('change', refresh); };
  }, [enabled]);
  return <canvas ref={canvasRef} className={`rain-layer${enabled ? ' is-on' : ''}`} aria-hidden="true" />;
}
