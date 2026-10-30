import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject, ReactNode, PointerEvent, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from './I18n.tsx';
import { clampNoteSize, clampPanel } from './panelGeometry.ts';
import type { Point, Size } from './panelGeometry.ts';

type Props = {
  panelRef: RefObject<HTMLElement | null>; anchorRef?: RefObject<SVGGElement | null>;
  id?: string; className: string; title: string; headingId?: string; open?: boolean;
  width: number; initialHeight?: number; placement: 'notes' | 'timer' | 'cassettes' | 'player';
  pinned?: boolean; onTogglePin?: () => void; onClose?: (returnFocus?: boolean) => void;
  closeLabel?: string; closeId?: string; children: ReactNode; footer?: ReactNode; actions?: ReactNode;
  attributes?: Record<string, string | boolean>; resizable?: boolean;
};
type Gesture = { kind: 'move' | 'resize'; pointer: number; x: number; y: number; position: Point; size: Size; moved: boolean };
let topLayer = 100;
const viewport = (): Size => ({ width: window.innerWidth, height: window.innerHeight });
const grip = <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 4h.1M10 4h.1M5 8h.1M10 8h.1M5 12h.1M10 12h.1"/></svg>;

/** Stable body portal: changing geometry never moves or remounts the iframe/editor subtree. */
export function FloatingPanel({ panelRef, anchorRef, id, className, title, headingId, open = true, width, initialHeight, placement, pinned, onTogglePin, onClose, closeLabel, closeId, children, footer, actions, attributes, resizable }: Props) {
  const { t } = useI18n();
  const [position, setPosition] = useState<Point | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [layer, setLayer] = useState(() => ++topLayer);
  const [moving, setMoving] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const initialPosition = useRef<Point | null>(null);
  const bringForward = () => setLayer(++topLayer);
  const actualSize = (): Size => ({ width: panelRef.current?.offsetWidth ?? width, height: panelRef.current?.offsetHeight ?? initialHeight ?? 300 });
  const currentPoint = (): Point => { const rect = panelRef.current!.getBoundingClientRect(); return { x: rect.left, y: rect.top }; };

  useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    const view = viewport();
    const dimensions = resizable ? clampNoteSize(size ?? { width, height: initialHeight ?? 420 }, view) : { width: Math.min(width, view.width - 24), height: panelRef.current.offsetHeight };
    if (resizable) setSize(prev => prev?.width === dimensions.width && prev.height === dimensions.height ? prev : dimensions);
    if (position) { setPosition(clampPanel(position, dimensions, view)); return; }
    const anchor = anchorRef?.current?.getBoundingClientRect();
    let x = placement === 'player' ? view.width - dimensions.width - 24 : placement === 'cassettes' ? 24 : (anchor?.left ?? view.width * .65) - dimensions.width - 16;
    let y = placement === 'cassettes' ? Math.max(76, (anchor?.top ?? 100) - 36) : (anchor?.top ?? view.height * .75) - dimensions.height - 16;
    if (placement === 'notes') x = (anchor ? anchor.left + anchor.width / 2 : view.width / 2) - dimensions.width / 2;
    x = Math.max(12, Math.min(x, view.width - dimensions.width - 12));
    y = Math.max(12, Math.min(y, view.height - dimensions.height - 12));
    const others = [...document.querySelectorAll<HTMLElement>('.floating-panel:not([hidden])')]
      .filter(panel => panel !== panelRef.current && panel.style.visibility !== 'hidden').map(panel => panel.getBoundingClientRect());
    const clear = (point: Point) => others.every(rect => point.x + dimensions.width + 10 <= rect.left || point.x >= rect.right + 10 || point.y + dimensions.height + 10 <= rect.top || point.y >= rect.bottom + 10);
    if (!clear({ x, y })) {
      const candidates: Point[] = [
        ...others.flatMap(rect => [{ x: rect.left - dimensions.width - 12, y }, { x: rect.right + 12, y }, { x, y: rect.top - dimensions.height - 12 }, { x, y: rect.bottom + 12 }]),
        { x: 12, y: 12 }, { x: view.width - dimensions.width - 12, y: 12 }, { x: 12, y: view.height - dimensions.height - 12 }, { x: view.width - dimensions.width - 12, y: view.height - dimensions.height - 12 },
      ];
      const candidate = candidates.filter(point => point.x >= 12 && point.y >= 12 && point.x + dimensions.width <= view.width - 12 && point.y + dimensions.height <= view.height - 12 && clear(point))
        .sort((a, b) => (a.x - x) ** 2 + (a.y - y) ** 2 - (b.x - x) ** 2 - (b.y - y) ** 2)[0];
      if (candidate) { x = candidate.x; y = candidate.y; }
    }
    initialPosition.current = { x, y };
    setPosition({ x, y });
    // Opening establishes the initial position once. Later content changes must not move a card.
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const resize = () => {
      const view = viewport(), current = actualSize();
      const next = resizable ? clampNoteSize(current, view) : { ...current, width: Math.max(1, Math.min(width, view.width - 24)) };
      if (resizable) setSize(next);
      setPosition(prev => prev ? clampPanel(prev, next, view) : prev);
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [open, resizable, panelRef, width]);
  useEffect(() => {
    if (!open || !onClose) return;
    const outside = (event: globalThis.PointerEvent) => {
      if (pinned || !(event.target instanceof Node)) return;
      if (!panelRef.current?.contains(event.target) && !anchorRef?.current?.contains(event.target)) onClose(false);
    };
    const key = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      const focusedDialog = document.activeElement?.closest('[role=dialog]');
      if (focusedDialog && focusedDialog !== panelRef.current) return;
      const active = document.activeElement?.closest('.floating-panel');
      const panels = [...document.querySelectorAll<HTMLElement>('.floating-panel:not([hidden])')];
      const top = panels.reduce<HTMLElement | undefined>((a, b) => !a || Number(b.style.zIndex) > Number(a.style.zIndex) ? b : a, undefined);
      if ((active ?? top) === panelRef.current) { event.preventDefault(); onClose(); }
    };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', key);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', key); };
  }, [open, pinned, onClose, anchorRef, panelRef]);
  useEffect(() => {
    const cancel = () => {
      const current = gesture.current; if (!current) return;
      gesture.current = null; setMoving(false); document.documentElement.removeAttribute('data-panel-gesture');
      if (panelRef.current?.hasPointerCapture(current.pointer)) panelRef.current.releasePointerCapture(current.pointer);
    };
    window.addEventListener('blur', cancel);
    return () => { window.removeEventListener('blur', cancel); if (gesture.current) document.documentElement.removeAttribute('data-panel-gesture'); };
  }, [panelRef]);

  function start(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0 || !(event.target instanceof Element)) return;
    const resize = event.target.closest('[data-panel-resize]');
    if (!resize && (!event.target.closest('[data-drag-surface]') || event.target.closest('button,input,textarea,select,a'))) return;
    event.preventDefault();
    gesture.current = { kind: resize ? 'resize' : 'move', pointer: event.pointerId, x: event.clientX, y: event.clientY, position: currentPoint(), size: actualSize(), moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLElement>) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
    if (!drag.moved) { drag.moved = true; setMoving(true); document.documentElement.setAttribute('data-panel-gesture', ''); }
    if (drag.kind === 'resize') {
      const next = clampNoteSize({ width: drag.size.width + dx, height: drag.size.height + dy }, viewport());
      setSize(next); setPosition(clampPanel(drag.position, next, viewport()));
    } else setPosition(clampPanel({ x: drag.position.x + dx, y: drag.position.y + dy }, drag.size, viewport()));
  }
  function end(event: PointerEvent<HTMLElement>) {
    if (!gesture.current || gesture.current.pointer !== event.pointerId) return;
    gesture.current = null; setMoving(false); document.documentElement.removeAttribute('data-panel-gesture');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (!(event.target instanceof HTMLElement) || !event.target.matches('[data-panel-handle],[data-panel-resize]')) return;
    if (event.key === 'Home' && event.target.hasAttribute('data-panel-handle')) { event.preventDefault(); bringForward(); setPosition(clampPanel(initialPosition.current ?? { x: 12, y: 12 }, actualSize(), viewport())); return; }
    const delta: Record<string, Point> = { ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 } };
    const offset = delta[event.key]; if (!offset) return;
    event.preventDefault(); event.stopPropagation(); bringForward();
    const step = event.shiftKey ? 30 : 10;
    if (event.target.hasAttribute('data-panel-resize')) { const box = actualSize(); const next = clampNoteSize({ width: box.width + offset.x * step, height: box.height + offset.y * step }, viewport()); setSize(next); setPosition(clampPanel(currentPoint(), next, viewport())); }
    else { const point = currentPoint(); setPosition(clampPanel({ x: point.x + offset.x * step, y: point.y + offset.y * step }, actualSize(), viewport())); }
  }
  const style: CSSProperties = { left: position?.x ?? 0, top: position?.y ?? 0, width: size?.width ?? Math.min(width, window.innerWidth - 24), height: resizable ? size?.height ?? initialHeight : undefined, zIndex: layer, visibility: open && !position ? 'hidden' : undefined };
  const moveLabel = t('movePanel', { name: title });
  return createPortal(<section id={id} ref={panelRef} className={`${className} floating-panel`} hidden={!open} style={style} role="dialog" aria-modal="false" aria-label={title} aria-labelledby={headingId} data-dragging={moving} data-pinned={!!pinned} {...attributes} onPointerDownCapture={bringForward} onFocusCapture={bringForward} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={() => { if (gesture.current) { gesture.current = null; setMoving(false); document.documentElement.removeAttribute('data-panel-gesture'); } }} onKeyDown={keyboard}>
    <header className="music-panel-heading floating-heading" data-drag-surface>
      <span className="floating-grab" data-panel-handle data-drag-surface tabIndex={0} role="button" aria-label={moveLabel} title={moveLabel}>{grip}<span id={headingId}>{title}</span></span>
      <div className="floating-heading-actions">
        {onTogglePin && <button className="panel-pin" type="button" aria-pressed={pinned} aria-label={t(pinned ? 'unpinPanel' : 'pinPanel', { name: title })} title={t(pinned ? 'unpinPanel' : 'pinPanel', { name: title })} onClick={onTogglePin}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 3 6 0-1 5 3 3v2H5v-2l3-3ZM10 13v5"/></svg></button>}
        {actions}
        {onClose && <button className="music-close" id={closeId} type="button" aria-label={closeLabel} onClick={() => onClose()}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button>}
      </div>
    </header>
    {children}
    <footer className="floating-footer" data-drag-surface>{footer}<span className="floating-footer-grab" data-panel-handle data-drag-surface role="button" tabIndex={0} aria-label={moveLabel} title={moveLabel}></span></footer>
    {resizable && <button type="button" className="panel-resize" data-panel-resize aria-label={t('resizeNotes')} title={t('resizeNotes')}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 13 9-9M9 13l4-4"/></svg></button>}
  </section>, document.body);
}
