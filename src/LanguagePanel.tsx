import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useI18n } from './I18n.tsx';
import { languages, localeCodes } from './i18n.ts';

type Props = { open: boolean; objectRef: RefObject<SVGGElement | null>; onClose: (returnFocus?: boolean) => void };
export function LanguagePanel({ open, objectRef, onClose }: Props) {
  const { t, preference, autoLocale, persistent, setPreference } = useI18n();
  const panelRef = useRef<HTMLElement>(null);
  const automaticRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    automaticRef.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !panelRef.current?.contains(event.target) && !objectRef.current?.contains(event.target)) onClose(false); };
    document.addEventListener('keydown', keydown); document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', outside); };
  }, [open, objectRef, onClose]);
  const check = <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-8"/></svg>;
  return <section id="language-panel" className="language-panel" ref={panelRef} hidden={!open} role="dialog" aria-modal="false" aria-labelledby="language-heading">
    <header className="music-panel-heading"><span id="language-heading">{t('language')}</span><button className="music-close" type="button" aria-label={t('closeLanguage')} onClick={() => onClose()}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg></button></header>
    <div className="language-options" role="group" aria-label={t('language')}>
      <button ref={automaticRef} type="button" className="language-auto" aria-pressed={preference === 'auto'} onClick={() => setPreference('auto')}><span>{t('automatic')}<small lang={autoLocale}>{languages[autoLocale].nativeName}</small></span>{preference === 'auto' && check}</button>
      {localeCodes.map(code => <button key={code} lang={code} type="button" aria-pressed={preference === code} onClick={() => setPreference(code)}><span>{languages[code].nativeName}</span>{preference === code && check}</button>)}
    </div>
    {!persistent && <p className="language-storage" role="status">{t('languageStorageError')}</p>}
  </section>;
}
