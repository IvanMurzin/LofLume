import { useEffect, useReducer, useState } from 'react';
import { createTimer, parseTimerDuration, timerReducer } from './timer.ts';

export function useFocusTimer() {
  const [state, dispatch] = useReducer(timerReducer, undefined, createTimer);
  const [hours, setHours] = useState('00');
  const [minutePart, setMinutePart] = useState('25');
  const minutes = parseTimerDuration(hours, minutePart);
  useEffect(() => {
    if (state.phase !== 'running') return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const tick = () => dispatch({ type: 'tick', now: Date.now() });
    const syncVisibility = () => {
      clearInterval(interval);
      tick();
      if (!document.hidden) interval = setInterval(tick, 250);
    };
    document.addEventListener('visibilitychange', syncVisibility);
    window.addEventListener('pageshow', syncVisibility);
    syncVisibility();
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', syncVisibility);
      window.removeEventListener('pageshow', syncVisibility);
    };
  }, [state.phase]);
  return {
    state, hours, setHours, minutePart, setMinutePart, valid: minutes !== null,
    toggle() {
      const now = Date.now();
      if (state.phase === 'running') dispatch({ type: 'pause', now });
      else if (state.phase === 'paused') dispatch({ type: 'resume', now });
      else if (minutes !== null) dispatch({ type: 'start', minutes, now });
    },
    reset() { dispatch({ type: 'reset' }); },
  };
}
