import { useI18n } from './I18n.tsx';

/** A small brass weather switch mounted on the café's right wooden post. */
export function RainSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  const { t } = useI18n();
  return <g id="rain-toggle" className="rain-switch" data-object="rain" role="button" tabIndex={0} aria-label={t(enabled ? 'disableRain' : 'enableRain')} aria-pressed={enabled} onClick={onToggle} onKeyDown={event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle(); }
  }}>
    <title>{t(enabled ? 'disableRain' : 'enableRain')}</title>
    <defs>
      <linearGradient id="rain-switch-brass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#71513a"/><stop offset=".5" stopColor="#4d3427"/><stop offset="1" stopColor="#35261e"/></linearGradient>
    </defs>
    <path className="rain-switch-plate" d="M1560 378 L1586 380 Q1590 380 1590 384 L1590 449 Q1590 453 1586 453 L1560 451 Q1556 451 1556 447 L1556 382 Q1556 378 1560 378 Z"/>
    <g className="rain-switch-screws"><circle cx="1561" cy="384" r="1.2"/><circle cx="1585" cy="447" r="1.2"/></g>
    <g className="rain-switch-cloud" transform="translate(1562 392) scale(.92)"><path d="M5 13a4 4 0 1 1 1-7.8 5 5 0 0 1 9.6 1.5A3.2 3.2 0 0 1 16 13H5Z"/><path className="rain-switch-drops" d="m5 16-1 3m7-3-1 3m7-3-1 3"/></g>
    <rect className="rain-switch-slot" x="1568" y="420" width="11" height="20" rx="5.5"/>
    <circle className="rain-switch-knob" cx="1573.5" cy={enabled ? 434 : 426} r="4"/>
    <rect className="rain-switch-hit" x="1556" y="378" width="34" height="75" rx="5"/>
  </g>;
}
