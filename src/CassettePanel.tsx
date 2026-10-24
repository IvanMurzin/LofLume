import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { parseCassette, providerNames } from './cassettes.ts';
import type { Cassette, CassetteSlots } from './cassettes.ts';

type Props = { open: boolean; slots: CassetteSlots; activeSlot?: number; persistent: boolean; objectRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void; onSave: (slot: number, tape: Cassette | null) => void; onInstall: (slot: number, tape: Cassette) => void };
export function CassettePanel({ open, slots, activeSlot, persistent, objectRef, onClose, onSave, onInstall }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const installRef = useRef<HTMLButtonElement>(null);
  const firstRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !panelRef.current?.contains(event.target) && !objectRef.current?.contains(event.target)) onClose(false); };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside); };
  }, [open, onClose, objectRef]);
  useEffect(() => {
    if (!open) return;
    if (editing !== null) inputRef.current?.focus();
    else if (selected !== null && slots[selected]) installRef.current?.focus({ preventScroll: true });
    else firstRef.current?.focus({ preventScroll: true });
  }, [editing, open, selected, slots]);
  function edit(slot: number) { setSelected(slot); setEditing(slot); setUrl(slots[slot]?.url ?? ''); setName(slots[slot]?.name ?? ''); setError(''); }
  const tape = selected !== null ? slots[selected] : null;
  return <section id="cassette-panel" className="cassette-panel" ref={panelRef} hidden={!open} role="dialog" aria-modal="false" aria-labelledby="cassette-heading">
    <header className="music-panel-heading"><span id="cassette-heading">Кассеты</span><button className="music-close" type="button" aria-label="Закрыть кассеты" onClick={() => onClose()}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
    {editing === null ? <>
      <div className="cassette-slots">{slots.map((item, slot) => <button key={slot} ref={slot === 0 ? firstRef : undefined} type="button" className={`cassette-slot tape-color-${slot}${selected === slot ? ' is-selected' : ''}`} aria-label={`Кассета ${slot + 1} — ${item?.name ?? 'пустая'}`} aria-pressed={selected === slot} onClick={() => { if (!item) edit(slot); else setSelected(slot); }}>
        <svg viewBox="0 0 260 76" aria-hidden="true"><rect x="2" y="2" width="256" height="72" rx="7"/><path d="m51 72 10-18h138l10 18"/><rect x="20" y="10" width="220" height="37" rx="3"/><circle cx="89" cy="61" r="6"/><circle cx="171" cy="61" r="6"/><path d="M95 61h70"/></svg>
        <span className="cassette-number">0{slot + 1}</span><span className="cassette-name">{item?.name ?? 'Вставить ссылку'}</span><span className="cassette-service">{activeSlot === slot ? 'В радио · ' : ''}{item ? providerNames[item.provider] : 'Пустая кассета'}</span>
      </button>)}</div>
      {tape && selected !== null && <div className="cassette-actions"><button id="install-cassette" ref={installRef} className="music-play" type="button" onClick={() => onInstall(selected, tape)}>Поставить</button><button type="button" className="tape-link-button" onClick={() => edit(selected)}>Заменить</button><button type="button" className="tape-link-button" aria-label="Удалить кассету" onClick={() => { onSave(selected, null); setSelected(null); }}>Убрать</button></div>}
    </> : <form className="cassette-editor" noValidate onSubmit={event => { event.preventDefault(); const parsed = parseCassette(url, name || `Кассета 0${editing + 1}`); if (!parsed) { setError('Нужна ссылка на видео или подборку YouTube, Spotify или Яндекс Музыки. Для короткой ссылки скопируй полный адрес из браузера.'); return; } onSave(editing, parsed); setSelected(editing); setEditing(null); setError(''); }}>
      <label htmlFor="cassette-url">Ссылка на музыку</label><input ref={inputRef} id="cassette-url" type="url" value={url} maxLength={2048} placeholder="Вставь ссылку" autoComplete="off" spellCheck={false} aria-invalid={!!error} aria-describedby={error ? 'cassette-error' : undefined} onChange={event => { setUrl(event.target.value); setError(''); }} />
      <label htmlFor="cassette-name">Надпись на кассете</label><input id="cassette-name" value={name} maxLength={60} placeholder={`Кассета 0${editing + 1}`} autoComplete="off" onChange={event => setName(event.target.value)} />
      {error && <p id="cassette-error" className="cassette-error" role="alert">{error}</p>}
      <div className="cassette-actions"><button className="music-play" type="submit">Сохранить</button><button className="tape-link-button" type="button" onClick={() => { setEditing(null); setError(''); }}>Назад</button></div>
    </form>}
    <p className="cassette-storage" role="status">{persistent ? 'Ссылки сохраняются в этом браузере.' : 'Браузер не дал сохранить кассеты. Пока они останутся в этой вкладке.'}</p>
  </section>;
}
