import { useEffect, useRef, useState } from 'react';
import { useI18n } from './I18n.tsx';
import { loadFacts, pickNextFactIndex } from './facts.ts';
import type { Fact } from './facts.ts';

type ObjectName = 'coffee' | 'platypus';

/** Small, optional discoveries. No audio, persistence or payment service until configured. */
export function SmallInteractions() {
  const { t, locale } = useI18n();
  const [feedback, setFeedback] = useState<{ object: ObjectName; revision: number; factIndex: number | null } | null>(null);
  const [visible, setVisible] = useState(false);
  const count = useRef(0);
  const [facts, setFacts] = useState<Fact[] | null>(null);
  const [factError, setFactError] = useState(false);
  useEffect(() => () => { count.current++; }, []);
  const lastFact = useRef<number | null>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  async function activate(object: ObjectName) {
    const revision = ++count.current;
    setFactError(false);
    setFeedback({ object, revision, factIndex: null });
    setVisible(true);
    if (object !== 'platypus') return;
    try {
      const loaded = facts ?? await loadFacts();
      if (count.current !== revision) return;
      setFacts(loaded);
      lastFact.current = pickNextFactIndex(loaded.length, lastFact.current);
      setFeedback({ object, revision, factIndex: lastFact.current });
    } catch {
      if (count.current === revision) setFactError(true);
    }
  }
  useEffect(() => {
    if (!feedback || !visible) return;
    const dismiss = () => { count.current++; setVisible(false); };
    const timer = feedback.object === 'platypus' && feedback.factIndex === null && !factError ? undefined : setTimeout(dismiss, 5200);
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') dismiss(); };
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!noticeRef.current?.contains(event.target) && !event.target.closest(`[data-object="${feedback.object}"]`)) dismiss();
    };
    const visibility = () => { if (document.hidden) dismiss(); };
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [feedback, visible, factError]);
  useEffect(() => {
    if (visible || !feedback) return;
    const timer = setTimeout(() => setFeedback(null), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240);
    return () => clearTimeout(timer);
  }, [visible, feedback]);

  return <>
    <svg className="room-objects small-objects" viewBox="0 0 1671 941" aria-label={t('smallObjects')}>
      <g className="object-target" data-object="platypus" role="button" tabIndex={0} aria-label={t('platypusAction')} onClick={() => activate('platypus')} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate('platypus'); } }}>
        <path className="object-shape" d="M89 378 C86 350 103 332 127 329 C157 323 179 338 185 359 L187 367 Q204 375 195 386 L185 395 L187 422 Q201 420 203 435 Q205 450 191 453 L89 453 Q61 454 57 441 Q51 425 61 407 Q71 388 89 378 Z"/>
      </g>
      <g className="object-target" data-object="coffee" role="button" tabIndex={0} aria-label={t('coffeeAction')} onClick={() => activate('coffee')} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activate('coffee'); } }}>
        <path className="object-shape" d="M696 656 L700 647 Q700 639 715 638 L786 637 Q800 637 803 644 L805 655 L815 658 Q820 661 816 669 L808 673 L799 785 Q799 794 780 795 L725 794 Q711 793 710 785 L699 676 L691 673 Q685 669 691 660 Z"/>
      </g>

    </svg>
    {feedback && <div ref={noticeRef} id="small-object-notice" className={`small-object-notice is-${feedback.object}${visible ? '' : ' is-leaving'}`} role="status" aria-live="polite" aria-atomic="true">
      {feedback.object === 'coffee' ? <>
        <span className="small-notice-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4ZM17 9h2a3 3 0 0 1 0 6h-2M8 3v2m5-2v2"/></svg></span>
        <span>{t('coffeePlaceholder')}</span>
      </> : <div className="platypus-speech">
        <span className="platypus-name"><svg className="platypus-thought-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 15a4 4 0 0 1-1-7.8A4.5 4.5 0 0 1 14 5a4 4 0 0 1 5.5 5.6A3.5 3.5 0 0 1 17 16H9"/><circle cx="6.5" cy="18.5" r="1.2"/><circle cx="3" cy="22" r=".6"/></svg><span>{t('platypusThinking', { name: t('platypusName') })}</span></span>
        <span className="platypus-fact">{factError ? t('factLoadError') : feedback.factIndex === null ? t('loading') : facts?.[feedback.factIndex].text[locale]}</span>
      </div>}
    </div>}
  </>;
}
