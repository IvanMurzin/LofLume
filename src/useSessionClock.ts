import { useI18n } from './I18n.tsx';
import { useEffect, useReducer, useState } from 'react';
import { clampTimerDuration, parseTimerDuration } from './timer.ts';
import { clockReducer, clockSettingsKey, clockTitle, clockValue, completionMessage, createClock, readyPomodoroStage, restoreClockSettings } from './clock.ts';
import type { ClockMode, ClockSettings } from './clock.ts';
function initialClock() {
  try { return createClock(restoreClockSettings(JSON.parse(localStorage.getItem(clockSettingsKey) ?? 'null'))); }
  catch { return createClock(); }
}
export function useSessionClock() {
  const { t } = useI18n();
  const [model, dispatch] = useReducer(clockReducer, undefined, initialClock);
  const [duration, setDuration] = useState({ hours: '00', minutes: '25', seconds: '00' });
  const seconds = parseTimerDuration(duration.hours, duration.minutes, duration.seconds);
  const state = clockValue(model);
  useEffect(() => {
    try { localStorage.setItem(clockSettingsKey, JSON.stringify(model.settings)); } catch { /* Settings still work in memory. */ }
  }, [model.settings]);
  useEffect(() => {
    if (state.phase !== 'running') return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const tick = () => dispatch({ type: 'tick', now: Date.now() });
    const sync = () => { clearInterval(interval); tick(); interval = setInterval(tick, document.hidden ? 1000 : 250); };
    document.addEventListener('visibilitychange', sync); window.addEventListener('pageshow', sync); sync();
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', sync); window.removeEventListener('pageshow', sync); };
  }, [state.phase, model.mode]);
  return {
    model, mode: model.mode, state, title: clockTitle(model, { focus: t('focus'), rest: t('break') }), noticeText: completionMessage(model.completion.kind, { timer: t('timeUp'), focus: t('focusDone'), rest: t('breakDone') }), completionId: model.completion.id,
    hours: duration.hours, minutePart: duration.minutes, secondPart: duration.seconds, valid: model.mode !== 'timer' || seconds !== null,
    readyStage: readyPomodoroStage(model),
    selectMode(mode: ClockMode) { dispatch({ type: 'select', mode, now: Date.now() }); },
    setSettings(settings: Partial<ClockSettings>) { dispatch({ type: 'settings', settings }); },
    setHours(value: string) { setDuration(current => clampTimerDuration(value, current.minutes, current.seconds)); },
    setMinutePart(value: string) { setDuration(current => clampTimerDuration(current.hours, value, current.seconds)); },
    setSecondPart(value: string) { setDuration(current => clampTimerDuration(current.hours, current.minutes, value)); },
    toggle() { dispatch({ type: 'toggle', seconds: seconds ?? 0, now: Date.now() }); },
    reset() { dispatch({ type: 'reset' }); },
  };
}
