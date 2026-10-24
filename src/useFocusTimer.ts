import { useEffect, useReducer, useState } from 'react';
import { clampTimerDuration, createTimer, parseTimerDuration, timerReducer } from './timer.ts';

export function useFocusTimer() {
  const [state, dispatch] = useReducer(timerReducer, undefined, createTimer);
  const [duration, setDuration] = useState({ hours: '00', minutes: '25' });
  const minutes = parseTimerDuration(duration.hours, duration.minutes);
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
    state, hours: duration.hours, minutePart: duration.minutes, valid: minutes !== null,
    setHours(value: string) { setDuration(current => clampTimerDuration(value, current.minutes)); },
    setMinutePart(value: string) { setDuration(current => clampTimerDuration(current.hours, value)); },
    toggle() {
      const now = Date.now();
      if (state.phase === 'running') dispatch({ type: 'pause', now });
      else if (state.phase === 'paused') dispatch({ type: 'resume', now });
      else if (minutes !== null) dispatch({ type: 'start', minutes, now });
    },
    reset() { dispatch({ type: 'reset' }); },
  };
}
