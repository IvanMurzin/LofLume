import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { useFocusTimer } from './useFocusTimer.ts';

type Props = { timer: ReturnType<typeof useFocusTimer>; open: boolean; clockRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void };
export function TimerPanel({ timer, open, clockRef, onClose }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const { phase } = timer.state;
  const locked = phase === 'running' || phase === 'paused';
  useEffect(() => {
    if (!open) return;
    playRef.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const pointerdown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !panelRef.current?.contains(target) && !clockRef.current?.contains(target)) onClose(false);
    };
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', pointerdown);
    return () => {
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('pointerdown', pointerdown);
    };
  }, [open, clockRef, onClose]);
  return <section className="music-panel timer-panel" id="timer-panel" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="timer-heading" hidden={!open}>
    <header className="music-panel-heading"><span id="timer-heading">Таймер</span><button className="music-close" id="timer-close" onClick={() => onClose()} type="button" aria-label="Закрыть таймер"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
    <form onSubmit={event => { event.preventDefault(); timer.toggle(); }}>
      <label className="timer-duration" htmlFor="timer-minutes"><span>Длительность, мин</span><input id="timer-minutes" type="number" inputMode="numeric" min="1" max="180" step="1" value={timer.input} disabled={locked} aria-invalid={!timer.valid} aria-describedby={!timer.valid ? 'timer-error' : undefined} onChange={event => timer.setInput(event.target.value)} /></label>
      <p className="timer-error" id="timer-error" hidden={timer.valid}>От 1 до 180 целых минут.</p>
      <div className="timer-actions"><button className="music-play" id="timer-toggle" ref={playRef} type="submit" disabled={!locked && !timer.valid}>{phase === 'running' ? 'Пауза' : phase === 'paused' ? 'Продолжить' : phase === 'finished' ? 'Ещё раз' : 'Старт'}</button><button className="timer-reset" id="timer-reset" type="button" onClick={timer.reset} disabled={phase === 'idle'}>Сбросить</button></div>
      <p className="timer-phase" hidden={phase !== 'paused' && phase !== 'finished'}>{phase === 'finished' ? 'Время вышло' : 'На паузе'}</p>
    </form>
  </section>;
}
