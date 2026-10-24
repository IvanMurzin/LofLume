import { useEffect, useState } from 'react';

type Props = { visible: boolean; onDismiss: () => void };

export function TimerNotice({ visible, onDismiss }: Props) {
  const [mounted, setMounted] = useState(visible);
  useEffect(() => {
    if (visible) { setMounted(true); return; }
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240;
    const timeout = setTimeout(() => setMounted(false), delay);
    return () => clearTimeout(timeout);
  }, [visible]);
  return <div className="timer-notice-slot">
    {mounted && <button id="timer-notice" className={`timer-notice${visible ? '' : ' is-leaving'}`} type="button" onClick={onDismiss} disabled={!visible} aria-label="Таймер завершён. Закрыть уведомление">
      <span className="timer-notice-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="m8 12 2.5 2.5 5-5"/></svg></span>
      <span className="timer-notice-copy">Время вышло</span>
    </button>}
  </div>;
}
