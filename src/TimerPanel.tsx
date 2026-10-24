import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { useFocusTimer } from './useFocusTimer.ts';

type Props = { timer: ReturnType<typeof useFocusTimer>; open: boolean; clockRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void };
export function TimerPanel({ timer, open, clockRef, onClose }: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const { phase } = timer.state;
  const locked = phase === 'running' || phase === 'paused';
  const totalSeconds = Math.ceil(timer.state.remainingMs / 1000);
  const readout = [Math.floor(totalSeconds / 3600), Math.floor(totalSeconds / 60) % 60, totalSeconds % 60].map(value => String(value).padStart(2, '0'));
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
      <div className="timer-readout" role={phase === 'idle' ? 'group' : 'timer'} aria-label={phase === 'idle' ? 'Длительность таймера' : readout.join(':')}>
        <label className="timer-unit"><input id="timer-hours" aria-label="Часы" type="text" inputMode="numeric" maxLength={2} value={phase === 'idle' ? timer.hours : readout[0]} readOnly={phase !== 'idle'} onFocus={event => { if (phase === 'idle') event.target.select(); }} onBlur={() => { if (phase === 'idle') timer.setHours(timer.hours.padStart(2, '0')); }} onChange={event => timer.setHours(event.target.value)} /><span>часы</span></label>
        <span className="timer-separator" aria-hidden="true">:</span>
        <label className="timer-unit"><input id="timer-minutes" aria-label="Минуты" type="text" inputMode="numeric" maxLength={2} value={phase === 'idle' ? timer.minutePart : readout[1]} readOnly={phase !== 'idle'} onFocus={event => { if (phase === 'idle') event.target.select(); }} onBlur={() => { if (phase === 'idle') timer.setMinutePart(timer.minutePart.padStart(2, '0')); }} onChange={event => timer.setMinutePart(event.target.value)} /><span>минуты</span></label>
        <span className="timer-separator" aria-hidden="true">:</span>
        <label className="timer-unit"><input id="timer-seconds" aria-label="Секунды" type="text" value={phase === 'idle' ? '00' : readout[2]} readOnly /><span>секунды</span></label>
      </div>
      <div className="timer-actions"><button className="music-play" id="timer-toggle" ref={playRef} type="submit" disabled={!locked && !timer.valid}><svg viewBox="0 0 20 20" aria-hidden="true">{phase === 'running' ? <path d="M7 5v10M13 5v10"/> : <path d="m7 4 9 6-9 6Z"/>}</svg>{phase === 'running' ? 'Пауза' : phase === 'paused' ? 'Продолжить' : phase === 'finished' ? 'Ещё раз' : 'Старт'}</button><button className="timer-reset" id="timer-reset" type="button" onClick={timer.reset} disabled={phase === 'idle'} aria-label="Сбросить таймер" title="Сбросить"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8a6 6 0 1 1 0 5M4 3v5h5"/></svg></button></div>
    </form>
  </section>;
}
