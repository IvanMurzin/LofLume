import { ru } from './locales/ru.ts';
import { createTimer, formatTimer, timerReducer } from './timer.ts';
import type { TimerState } from './timer.ts';

export type ClockMode = 'timer' | 'stopwatch' | 'pomodoro';
export type PomodoroStage = 'focus' | 'short' | 'long';
export type ClockSettings = { focus: number; short: number; long: number; auto: boolean };
export const defaultClockSettings: ClockSettings = { focus: 25, short: 5, long: 15, auto: false };
export const clockSettingsKey = 'loflume.clock.preferences.v1';
export function restoreClockSettings(value: unknown): ClockSettings {
  const input = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const minutes = (key: 'focus' | 'short' | 'long') => typeof input[key] === 'number' && Number.isInteger(input[key]) && input[key] >= 1 && input[key] <= 180 ? input[key] : defaultClockSettings[key];
  return { focus: minutes('focus'), short: minutes('short'), long: minutes('long'), auto: typeof input.auto === 'boolean' ? input.auto : false };
}
export type ClockState = {
  mode: ClockMode; timer: TimerState;
  stopwatch: { phase: 'idle' | 'running' | 'paused'; elapsedMs: number; startedAt: number | null };
  pomodoro: { timer: TimerState; stage: PomodoroStage; completed: number };
  settings: ClockSettings;
  completion: { id: number; kind: 'timer' | PomodoroStage };
};
export type ClockAction =
  | { type: 'tick' | 'pause' | 'toggle'; now: number; seconds?: number }
  | { type: 'select'; mode: ClockMode; now: number }
  | { type: 'reset' }
  | { type: 'settings'; settings: Partial<ClockSettings> };
export function createClock(settings = defaultClockSettings): ClockState {
  return { mode: 'timer', timer: createTimer(), stopwatch: { phase: 'idle', elapsedMs: 0, startedAt: null }, pomodoro: { timer: createTimer(), stage: 'focus', completed: 0 }, settings: restoreClockSettings(settings), completion: { id: 0, kind: 'timer' } };
}
export function nextPomodoroStage(state: ClockState): PomodoroStage {
  return state.pomodoro.stage === 'focus' ? state.pomodoro.completed >= 4 ? 'long' : 'short' : 'focus';
}
export function readyPomodoroStage(state: ClockState): PomodoroStage {
  return state.pomodoro.timer.phase === 'finished' ? nextPomodoroStage(state) : state.pomodoro.stage;
}
export function clockValue(state: ClockState): TimerState {
  if (state.mode === 'timer') return state.timer;
  if (state.mode === 'pomodoro') return state.pomodoro.timer;
  return { phase: state.stopwatch.phase, remainingMs: Math.floor(state.stopwatch.elapsedMs / 1000) * 1000, deadline: null };
}
export function formatStopwatch(elapsedMs: number): string {
  const total = Math.floor(Math.max(0, elapsedMs) / 1000);
  return [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60].map(value => String(value).padStart(2, '0')).join(':');
}
export function clockTitle(state: ClockState, labels = { focus: ru.focus, rest: ru.break }): string {
  const current = clockValue(state);
  if (current.phase === 'idle') return 'LofLume — Home Work';
  const suffix = state.mode === 'pomodoro' ? ` · ${state.pomodoro.stage === 'focus' ? labels.focus : labels.rest}` : '';
  return `LofLume | ${state.mode === 'stopwatch' ? formatStopwatch(current.remainingMs) : formatTimer(current.remainingMs)}${suffix}`;
}
function beginPomodoro(state: ClockState, now: number): ClockState {
  const stage = readyPomodoroStage(state);
  const completed = state.pomodoro.timer.phase === 'finished' && state.pomodoro.stage === 'long' ? 0 : state.pomodoro.completed;
  return { ...state, pomodoro: { stage, completed, timer: timerReducer(createTimer(), { type: 'start', now, seconds: state.settings[stage] * 60 }) } };
}
function syncClock(state: ClockState, now: number, pause = false): ClockState {
  if (state.mode === 'stopwatch') {
    const watch = state.stopwatch;
    if (watch.phase !== 'running' || watch.startedAt === null) return state;
    return { ...state, stopwatch: { phase: pause ? 'paused' : 'running', elapsedMs: watch.elapsedMs + Math.max(0, now - watch.startedAt), startedAt: pause ? null : now } };
  }
  const before = state.mode === 'timer' ? state.timer : state.pomodoro.timer;
  const after = timerReducer(before, { type: pause ? 'pause' : 'tick', now });
  if (after === before) return state;
  const finished = before.phase === 'running' && after.phase === 'finished';
  const completion = finished ? { id: state.completion.id + 1, kind: state.mode === 'timer' ? 'timer' as const : state.pomodoro.stage } : state.completion;
  if (state.mode === 'timer') return { ...state, timer: after, completion };
  const result = { ...state, completion, pomodoro: { ...state.pomodoro, timer: after, completed: state.pomodoro.completed + (finished && state.pomodoro.stage === 'focus' ? 1 : 0) } };
  return finished && state.settings.auto && !pause ? beginPomodoro(result, now) : result;
}
export function clockReducer(state: ClockState, action: ClockAction): ClockState {
  switch (action.type) {
    case 'select':
      return action.mode === state.mode ? state : { ...syncClock(state, action.now, true), mode: action.mode };
    case 'tick': return syncClock(state, action.now);
    case 'pause': return syncClock(state, action.now, true);
    case 'settings': {
      const settings = restoreClockSettings({ ...state.settings, ...action.settings });
      const locked = state.pomodoro.timer.phase !== 'idle';
      return { ...state, settings: locked ? { ...state.settings, auto: settings.auto } : settings };
    }
    case 'reset':
      if (state.mode === 'timer') return { ...state, timer: createTimer() };
      if (state.mode === 'stopwatch') return { ...state, stopwatch: createClock().stopwatch };
      return { ...state, pomodoro: createClock().pomodoro };
    case 'toggle': {
      const phase = clockValue(state).phase;
      if (phase === 'running') return syncClock(state, action.now, true);
      if (state.mode === 'stopwatch') return { ...state, stopwatch: { ...state.stopwatch, phase: 'running', startedAt: action.now } };
      if (state.mode === 'timer') return { ...state, timer: phase === 'paused' ? timerReducer(state.timer, { type: 'resume', now: action.now }) : timerReducer(state.timer, { type: 'start', now: action.now, seconds: action.seconds ?? 0 }) };
      if (phase === 'paused') return { ...state, pomodoro: { ...state.pomodoro, timer: timerReducer(state.pomodoro.timer, { type: 'resume', now: action.now }) } };
      return beginPomodoro(state, action.now);
    }
  }
}
export function completionMessage(kind: ClockState['completion']['kind'], labels = { timer: ru.timeUp, focus: ru.focusDone, rest: ru.breakDone }): string {
  return kind === 'timer' ? labels.timer : kind === 'focus' ? labels.focus : labels.rest;
}
