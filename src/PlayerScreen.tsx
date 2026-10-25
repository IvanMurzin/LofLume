import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject, PointerEvent, KeyboardEvent } from 'react';
import { ExternalPlayer } from './ExternalPlayer.tsx';
import type { ExternalControls, ExternalPhase } from './ExternalPlayer.tsx';
import type { Cassette } from './cassettes.ts';

type Props = { controls: ExternalControls | null; tape: Cassette; revision: number; phase: ExternalPhase; volume: number; actionRef: RefObject<HTMLButtonElement | null>; onEject: () => void; onRetry: () => void; onPhase: (phase: ExternalPhase) => void; onControls: (controls: ExternalControls | null) => void };
type Point = { x: number; y: number };
export function PlayerScreen({ controls, tape, revision, phase, volume, actionRef, onEject, onRetry, onPhase, onControls }: Props) {
  const screenRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<Point | null>(null);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(null);
  const clamp = (point: Point): Point => {
    const screen = screenRef.current; const parent = screen?.parentElement;
    if (!screen || !parent) return point;
    return { x: Math.max(8, Math.min(point.x, Math.max(8, parent.clientWidth - screen.offsetWidth - 8))), y: Math.max(8, Math.min(point.y, Math.max(8, parent.clientHeight - screen.offsetHeight - 8))) };
  };
  const current = (): Point => {
    const screen = screenRef.current!; const parent = screen.parentElement!.getBoundingClientRect(); const rect = screen.getBoundingClientRect();
    return { x: rect.left - parent.left, y: rect.top - parent.top };
  };
  useEffect(() => {
    const screen = screenRef.current; if (!screen?.parentElement) return;
    const observer = new ResizeObserver(() => setPosition(prev => {
      if (!prev) return prev; const next = clamp(prev); return next.x === prev.x && next.y === prev.y ? prev : next;
    }));
    observer.observe(screen); observer.observe(screen.parentElement);
    return () => observer.disconnect();
  }, []);
  function start(event: PointerEvent<HTMLSpanElement>) {
    if (event.button !== 0) return;
    event.preventDefault(); const rect = screenRef.current!.getBoundingClientRect();
    drag.current = { pointerId: event.pointerId, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top };
    setPosition(current()); setDragging(true); event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLSpanElement>) {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    const parent = screenRef.current!.parentElement!.getBoundingClientRect();
    setPosition(clamp({ x: event.clientX - parent.left - drag.current.offsetX, y: event.clientY - parent.top - drag.current.offsetY }));
  }
  function end(event: PointerEvent<HTMLSpanElement>) {
    drag.current = null; setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyMove(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === 'Home') { event.preventDefault(); setPosition(null); return; }
    const offsets: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const offset = offsets[event.key]; if (!offset) return;
    event.preventDefault(); const point = current(); const step = event.shiftKey ? 30 : 10;
    setPosition(clamp({ x: point.x + offset[0] * step, y: point.y + offset[1] * step }));
  }
  const style: CSSProperties | undefined = position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' } : undefined;
  return <section ref={screenRef} className="external-screen" style={style} data-provider={tape.provider} data-phase={phase} data-dragging={dragging} aria-label={`Плеер — ${tape.name}`}>
    <header className="external-screen-heading">
      <span className="player-drag-handle" tabIndex={0} role="button" aria-label={`Переместить плеер ${tape.name}`} title="Потяни, чтобы переместить" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { drag.current = null; setDragging(false); }} onKeyDown={keyMove}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 4h.1M10 4h.1M5 8h.1M10 8h.1M5 12h.1M10 12h.1"/></svg><span>{tape.name}</span></span>
      <button ref={actionRef} type="button" className="eject-cassette" onClick={onEject} aria-label="Достать кассету"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 12 6-8 6 8ZM4 16h12"/></svg><span>Достать кассету</span></button>
    </header>
    <ExternalPlayer key={revision} tape={tape} volume={volume} onPhase={onPhase} onControls={onControls} />
    {tape.provider === 'yandex' && controls?.previous && controls.next && <div className="compact-transport" aria-label="Управление Яндекс Музыкой"><button type="button" aria-label="Предыдущий трек" onClick={controls.previous}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5v10M15 5 7 10l8 5Z"/></svg></button><button type="button" aria-label={phase === 'playing' ? 'Пауза кассеты' : 'Включить кассету'} onClick={controls.toggle}><svg viewBox="0 0 20 20" aria-hidden="true"><path d={phase === 'playing' ? 'M7 5v10M13 5v10' : 'M6 4l8 6-8 6Z'}/></svg></button><button type="button" aria-label="Следующий трек" onClick={controls.next}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M15 5v10M5 5l8 5-8 5Z"/></svg></button></div>}
    {phase === 'loading' && <p className="external-loading" role="status">Загрузка…</p>}
    {phase === 'error' && <div className="external-screen-footer external-error-actions" role="status"><span>Не удалось включить</span><button type="button" onClick={onRetry}>Повторить</button><a href={tape.url} target="_blank" rel="noopener noreferrer">Открыть в сервисе</a></div>}
  </section>;
}
