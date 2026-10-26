import { useI18n } from './I18n.tsx';
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import Markdown from 'react-markdown';
import type { LiveEditorHandle } from './LiveMarkdownEditor.tsx';
import type { useNotes } from './useNotes.ts';

const LiveMarkdownEditor = lazy(() => import('./LiveMarkdownEditor.tsx').then(module => ({ default: module.LiveMarkdownEditor })));

type Props = { open: boolean; notes: ReturnType<typeof useNotes>; objectRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void };
export function NotesPanel({ open, notes, objectRef, onClose }: Props) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<LiveEditorHandle>(null);
  const readRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'source' | 'live' | 'read'>('live');
  const reading = mode === 'read';
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [placement, setPlacement] = useState({ left: 16, top: 16, height: 420 });
  useEffect(() => {
    if (!open) return;
    setEditorLoaded(true);
    if (reading) readRef.current?.focus({ preventScroll: true }); else inputRef.current?.focus();
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const pointerdown = (event: PointerEvent) => { if (event.target instanceof Node && !panelRef.current?.contains(event.target) && !objectRef.current?.contains(event.target)) onClose(false); };
    document.addEventListener('keydown', keydown); document.addEventListener('pointerdown', pointerdown);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', pointerdown); };
  }, [open, reading, objectRef, onClose]);
  useLayoutEffect(() => {
    if (!open) return;
    const panel = panelRef.current, viewport = panel?.parentElement;
    if (!panel || !viewport) return;
    const player = viewport.querySelector<HTMLElement>('.external-screen');
    const update = () => {
      const outer = viewport.getBoundingClientRect(), width = panel.offsetWidth;
      let height = Math.min(420, viewport.clientHeight - 24);
      const clampX = (x: number) => Math.max(12, Math.min(x, outer.width - width - 12));
      const clampY = (y: number) => Math.max(12, Math.min(y, outer.height - height - 12));
      let left = clampX(outer.width * .54 - width / 2), top = clampY(outer.height * .86 - height);
      if (player) {
        const r = player.getBoundingClientRect();
        const video = { left: r.left - outer.left, right: r.right - outer.left, top: r.top - outer.top, bottom: r.bottom - outer.top };
        const clear = (x: number, y: number) => x + width + 10 <= video.left || x >= video.right + 10 || y + height + 10 <= video.top || y >= video.bottom + 10;
        if (!clear(left, top)) {
          const candidates = [[12, top], [outer.width - width - 12, top], [left, 12], [left, outer.height - height - 12]];
          const candidate = candidates.find(([x, y]) => x! >= 12 && y! >= 12 && x! + width <= outer.width - 12 && y! + height <= outer.height - 12 && clear(x!, y!));
          if (candidate) { [left, top] = candidate as [number, number]; }
          else {
            const below = outer.height - video.bottom - 24, above = video.top - 24;
            height = Math.max(120, Math.min(height, Math.max(below, above)));
            top = below >= above ? video.bottom + 12 : Math.max(12, video.top - height - 12);
          }
        }
      }
      setPlacement(previous => previous.left === left && previous.top === top && previous.height === height ? previous : { left, top, height });
    };
    update();
    const resize = new ResizeObserver(update); resize.observe(viewport); resize.observe(panel); if (player) resize.observe(player);
    const mutation = new MutationObserver(update); if (player) { mutation.observe(player, { attributes: true, attributeFilter: ['style'] }); player.addEventListener('animationend', update); }
    return () => { resize.disconnect(); mutation.disconnect(); player?.removeEventListener('animationend', update); };
  }, [open]);
  return <section id="notes-panel" className="notes-panel" ref={panelRef} hidden={!open} style={placement} data-mode={mode} role="dialog" aria-modal="false" aria-labelledby="notes-heading">
    <header className="music-panel-heading"><span id="notes-heading">{t('notebook')}</span><button className="music-close" type="button" aria-label={t('closeNotebook')} onClick={() => onClose()}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
    <div className="notes-sheet notes-editor-shell" hidden={reading}><Suspense fallback={<div className="notes-editor-loading" role="status">{t('loading')}</div>}>{editorLoaded && <LiveMarkdownEditor ref={inputRef} source={mode === 'source'} active={open && !reading} value={notes.text} onChange={notes.update}/>}</Suspense></div>
    {reading && <div ref={readRef} className="notes-sheet notes-preview" tabIndex={0} aria-label={t('noteText')}>{notes.text.trim() ? <Markdown components={{ a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer"/> }}>{notes.text}</Markdown> : <p className="notes-empty">{t('emptyNote')}</p>}</div>}
    <div className="notes-modes" role="group" aria-label={t('noteMode')}><button type="button" aria-label={t('sourceMode')} title={t('sourceMode')} aria-pressed={mode === 'source'} onClick={() => setMode('source')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5-5 5 5 5M13 5l5 5-5 5M11 3 9 17"/></svg></button><button type="button" aria-label={t('livePreview')} title={t('livePreview')} aria-pressed={mode === 'live'} onClick={() => setMode('live')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 13 8.5-8.5 3 3L7 16l-4 1Z M11 6l3 3"/></svg></button><button type="button" aria-label={t('readMode')} title={t('readMode')} aria-pressed={reading} onClick={() => setMode('read')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5C8 3.5 5 3.5 2.5 4.5v11C5 14.5 8 14.5 10 16c2-1.5 5-1.5 7.5-.5v-11C15 3.5 12 3.5 10 5Zm0 0v11"/></svg></button><span>Markdown</span></div>
    {!notes.persistent && <p className="notes-storage" role="status">{t('noteStorageError')}</p>}
  </section>;
}
