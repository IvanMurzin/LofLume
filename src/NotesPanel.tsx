import { FloatingPanel } from './FloatingPanel.tsx';
import { useI18n } from './I18n.tsx';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import Markdown from 'react-markdown';
import type { LiveEditorHandle } from './LiveMarkdownEditor.tsx';
import type { useNotes } from './useNotes.ts';

const LiveMarkdownEditor = lazy(() => import('./LiveMarkdownEditor.tsx').then(module => ({ default: module.LiveMarkdownEditor })));

type Props = { open: boolean; notes: ReturnType<typeof useNotes>; objectRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void; pinned: boolean; onTogglePin: () => void };
export function NotesPanel({ open, notes, objectRef, onClose, pinned, onTogglePin }: Props) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<LiveEditorHandle>(null);
  const readRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'source' | 'live' | 'read'>('live');
  const reading = mode === 'read';
  const [editorLoaded, setEditorLoaded] = useState(false);
  useEffect(() => {
    if (!open) return;
    setEditorLoaded(true);
    if (reading) readRef.current?.focus({ preventScroll: true }); else inputRef.current?.focus();
  }, [open, reading]);
  return <FloatingPanel panelRef={panelRef} anchorRef={objectRef} id="notes-panel" className="notes-panel" title={t('notebook')} headingId="notes-heading" open={open} width={360} initialHeight={420} placement="notes" pinned={pinned} onTogglePin={onTogglePin} onClose={onClose} closeLabel={t('closeNotebook')} attributes={{ 'data-mode': mode }} resizable footer={<div className="notes-modes" role="group" aria-label={t('noteMode')}><button type="button" aria-label={t('sourceMode')} title={t('sourceMode')} aria-pressed={mode === 'source'} onClick={() => setMode('source')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7 5-5 5 5 5M13 5l5 5-5 5M11 3 9 17"/></svg></button><button type="button" aria-label={t('livePreview')} title={t('livePreview')} aria-pressed={mode === 'live'} onClick={() => setMode('live')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 13 8.5-8.5 3 3L7 16l-4 1Z M11 6l3 3"/></svg></button><button type="button" aria-label={t('readMode')} title={t('readMode')} aria-pressed={reading} onClick={() => setMode('read')}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5C8 3.5 5 3.5 2.5 4.5v11C5 14.5 8 14.5 10 16c2-1.5 5-1.5 7.5-.5v-11C15 3.5 12 3.5 10 5Zm0 0v11"/></svg></button><span>Markdown</span></div>}>
    <div className="notes-sheet notes-editor-shell" hidden={reading}><Suspense fallback={<div className="notes-editor-loading" role="status">{t('loading')}</div>}>{editorLoaded && <LiveMarkdownEditor ref={inputRef} source={mode === 'source'} active={open && !reading} value={notes.text} onChange={notes.update}/>}</Suspense></div>
    {reading && <div ref={readRef} className="notes-sheet notes-preview" tabIndex={0} aria-label={t('noteText')}>{notes.text.trim() ? <Markdown components={{ a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer"/> }}>{notes.text}</Markdown> : <p className="notes-empty">{t('emptyNote')}</p>}</div>}
    {!notes.persistent && <p className="notes-storage" role="status">{t('noteStorageError')}</p>}
  </FloatingPanel>;
}
