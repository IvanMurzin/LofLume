import { useEffect, useRef, useState } from 'react';
import { useI18n } from './I18n.tsx';
import { platypusFacts, pickNextFactIndex } from './platypusFacts.ts';

type ObjectName = 'coffee' | 'platypus';

/** Small, optional discoveries. No audio, persistence or payment service until configured. */
export function SmallInteractions() {
  const { t, locale } = useI18n();
  const [feedback, setFeedback] = useState<{ object: ObjectName; revision: number; factIndex: number | null } | null>(null);
  const [visible, setVisible] = useState(false);
  const count = useRef(0);
  const lastFact = useRef<number | null>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  function activate(object: ObjectName) {
    if (object === 'platypus') lastFact.current = pickNextFactIndex(lastFact.current);
    setFeedback({ object, revision: ++count.current, factIndex: lastFact.current });
    setVisible(true);
  }
  useEffect(() => {
    if (!feedback || !visible) return;
    const dismiss = () => setVisible(false);
    const timer = setTimeout(dismiss, 5200);
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
  }, [feedback, visible]);
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
      <span className="small-notice-mark" aria-hidden="true">{feedback.object === 'coffee' ? <svg viewBox="0 0 24 24"><path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4ZM17 9h2a3 3 0 0 1 0 6h-2M8 3v2m5-2v2"/></svg> : '…'}</span>
      <span>{feedback.object === 'coffee' ? t('coffeePlaceholder') : platypusFacts[feedback.factIndex ?? 0].text[locale]}</span>
    </div>}
  </>;
}
