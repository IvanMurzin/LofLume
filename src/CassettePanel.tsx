import { useI18n } from './I18n.tsx';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { parseCassette } from './cassettes.ts';
import type { Cassette, CassetteSlots } from './cassettes.ts';

type Props = { open: boolean; slots: CassetteSlots; activeSlot?: number; persistent: boolean; objectRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void; onSave: (slot: number, tape: Cassette | null) => void; onInstall: (slot: number, tape: Cassette) => void };
const play = <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 4 8 6-8 6Z"/></svg>;
export function CassettePanel({ open, slots, activeSlot, persistent, objectRef, onClose, onSave, onInstall }: Props) {
  const { t, providers } = useI18n();
  const [editing, setEditing] = useState<number | null>(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [editorPosition, setEditorPosition] = useState({ side: false, top: 0 });
  const editorRef = useRef<HTMLFormElement>(null);
  const containers = useRef<(HTMLDivElement | null)[]>([]);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (!open) return;
    rowRefs.current[0]?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !panelRef.current?.contains(event.target) && !objectRef.current?.contains(event.target)) onClose(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); };
  }, [open, onClose, objectRef]);
  useEffect(() => { if (open && editing !== null) inputRef.current?.focus(); }, [editing, open, editorPosition.side]);
  useLayoutEffect(() => {
    if (!open) { setEditing(null); setUrl(''); setName(''); setError(false); return; }
    if (editing === null) return;
    const panel = panelRef.current; const row = containers.current[editing]; const form = editorRef.current;
    const viewport = panel?.parentElement;
    if (!panel || !row || !form || !viewport) return;
    const update = () => {
      const outer = viewport.getBoundingClientRect(); const bounds = panel.getBoundingClientRect(); const item = row.getBoundingClientRect();
      const height = form.offsetHeight; const width = form.offsetWidth; const x = bounds.right + 12;
      const y = Math.max(outer.top + 8, Math.min(item.top, outer.bottom - height - 8));
      const frame = viewport.querySelector('.external-screen iframe')?.getBoundingClientRect();
      const overlapsVideo = frame && x < frame.right && x + width > frame.left && y < frame.bottom && y + height > frame.top;
      const side = x + width <= outer.right - 8 && !overlapsVideo;
      const top = side ? y - bounds.top : 0;
      setEditorPosition(previous => previous.side === side && Math.abs(previous.top - top) < .5 ? previous : { side, top });
    };
    update();
    const observer = new ResizeObserver(update); observer.observe(viewport); observer.observe(panel); observer.observe(form);
    panel.addEventListener('scroll', update, true); window.addEventListener('resize', update);
    return () => { observer.disconnect(); panel.removeEventListener('scroll', update, true); window.removeEventListener('resize', update); };
  }, [open, editing, editorPosition.side]);
  function edit(slot: number) {
    if (editing === slot) { setEditing(null); rowRefs.current[slot]?.focus(); return; }
    setEditing(slot); setUrl(slots[slot]?.url ?? ''); setName(slots[slot]?.name ?? ''); setError(false);
  }
  const editor = editing === null ? null : (
    <form ref={editorRef} id={`cassette-editor-${editing}`} className={`cassette-editor ${editorPosition.side ? "cassette-side-editor" : "cassette-inline-editor"}`} style={editorPosition.side ? { top: editorPosition.top } : undefined} noValidate onSubmit={event => {
        event.preventDefault(); const parsed = parseCassette(url, name || t('cassetteDefault', { number: `0${editing + 1}` }));
        if (!parsed) { setError(true); return; }
        const slot = editing; onSave(slot, parsed); setEditing(null); setError(false); rowRefs.current[slot]?.focus({ preventScroll: true });
      }}>
        <label htmlFor={`cassette-url-${editing}`}>{t('link')}</label><input ref={inputRef} id={`cassette-url-${editing}`} type="url" value={url} maxLength={2048} placeholder={t('pasteLink')} autoComplete="off" spellCheck={false} aria-invalid={!!error} aria-describedby={error ? `cassette-error-${editing}` : undefined} onChange={event => { setUrl(event.target.value); setError(false); }} />
        <label htmlFor={`cassette-name-${editing}`}>{t('name')}</label><div className="cassette-save-row"><input id={`cassette-name-${editing}`} value={name} maxLength={60} placeholder={t('cassetteDefault', { number: `0${editing + 1}` })} autoComplete="off" onChange={event => setName(event.target.value)} /><button className="music-play" type="submit">{t('save')}</button></div>
        {error && <p id={`cassette-error-${editing}`} className="cassette-error" role="alert">{t('invalidMusicUrl')}</p>}
    </form>
  );
  return <section id="cassette-panel" className="cassette-panel" ref={panelRef} hidden={!open} role="dialog" aria-modal="false" aria-labelledby="cassette-heading">
    <header className="music-panel-heading"><span id="cassette-heading">{t('cassettes')}</span><button className="music-close" type="button" aria-label={t('closeCassettes')} onClick={() => onClose()}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
    <div className="cassette-slots">{slots.map((item, slot) => <div key={slot} ref={element => { containers.current[slot] = element; }} className={`cassette-row tape-color-${slot}${item ? ' is-filled' : ' is-empty'}${activeSlot === slot ? ' is-installed' : ''}`} data-slot={slot} data-filled={!!item}>
      <div className="cassette-card">
        <svg className="cassette-drawing" viewBox="0 0 300 88" aria-hidden="true"><rect className="cassette-shell" x="2" y="2" width="296" height="84" rx="8"/><rect className="cassette-paper" x="16" y="11" width="268" height="40" rx="3"/><path d="M70 84 80 61h140l10 23"/><circle className="cassette-reel" cx="115" cy="71" r="7"/><circle className="cassette-reel" cx="185" cy="71" r="7"/><path d="M123 71h54"/></svg>
        <button ref={element => { rowRefs.current[slot] = element; }} className="cassette-label-button" type="button" aria-label={item ? t('editCassette', { number: slot + 1, name: item.name }) : t('addCassette', { number: slot + 1 })} aria-expanded={editing === slot} aria-controls={`cassette-editor-${slot}`} onClick={() => edit(slot)}>
          <span className="cassette-number">0{slot + 1}</span><span className="cassette-name">{item?.name ?? '+'}</span><span className="cassette-service">{item ? `${activeSlot === slot ? t('insertedPrefix') : ''}${providers[item.provider]}` : ''}</span>
        </button>
        {item && <div className="cassette-row-actions"><button type="button" className="cassette-put" aria-label={t('insertCassette', { name: item.name })} title={t('install')} onClick={() => onInstall(slot, item)}>{play}</button><button type="button" aria-label={t('deleteCassette', { name: item.name })} title={t('delete')} onClick={() => { onSave(slot, null); if (editing === slot) setEditing(null); rowRefs.current[slot]?.focus(); }}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 3h4l1 3M6 6l1 11h6l1-11M9 9v5M11 9v5"/></svg></button></div>}
      </div>
      {editing === slot && !editorPosition.side && editor}

    </div>)}
    </div>
    {editorPosition.side && editor}
    {!persistent && <p className="cassette-storage" role="status">{t('cassetteStorageError')}</p>}
  </section>;
}
