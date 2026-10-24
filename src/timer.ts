export type TimerState = {
  phase: 'idle' | 'running' | 'paused' | 'finished';
  remainingMs: number;
  deadline: number | null;
};
export type TimerAction =
  | { type: 'start'; seconds: number; now: number }
  | { type: 'pause' | 'resume' | 'tick'; now: number }
  | { type: 'reset' };

export function createTimer(): TimerState {
  return { phase: 'idle', remainingMs: 0, deadline: null };
}

export type TimerDuration = { hours: string; minutes: string; seconds: string };

export function parseTimerDuration(hours: string, minutes: string, seconds: string): number | null {
  if (![hours, minutes, seconds].every(part => /^\d{1,2}$/.test(part))) return null;
  const h = Number(hours), m = Number(minutes), s = Number(seconds);
  const total = h * 3600 + m * 60 + s;
  return h <= 3 && m <= 59 && s <= 59 && total >= 1 && total <= 10800 ? total : null;
}

export function clampTimerDuration(hours: string, minutes: string, seconds: string): TimerDuration {
  const clampPart = (input: string, max: number) => {
    const digits = input.replace(/\D/g, '').slice(0, 2);
    if (!digits) return '';
    return Number(digits) > max ? String(max).padStart(2, '0') : digits;
  };
  const h = clampPart(hours, 3);
  return { hours: h, minutes: Number(h) === 3 ? '00' : clampPart(minutes, 59), seconds: Number(h) === 3 ? '00' : clampPart(seconds, 59) };
}

// A full field starts a fresh entry even if the user moved the caret inside it.
export function insertTimerDigit(value: string, digit: string, start: number, end: number): string {
  if (value.length >= 2 && start === end) return digit;
  return value.slice(0, start) + digit + value.slice(end);
}

function syncTime(state: TimerState, now: number): TimerState {
  if (state.phase !== 'running' || state.deadline === null) return state;
  const remainingMs = Math.max(0, state.deadline - now);
  return remainingMs === 0
    ? { phase: 'finished', remainingMs: 0, deadline: null }
    : { ...state, remainingMs };
}

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'start': {
      if (state.phase === 'running' || state.phase === 'paused' || !Number.isInteger(action.seconds) || action.seconds < 1 || action.seconds > 10800) return state;
      const remainingMs = action.seconds * 1000;
      return { phase: 'running', remainingMs, deadline: action.now + remainingMs };
    }
    case 'pause': {
      const current = syncTime(state, action.now);
      return current.phase === 'running' ? { ...current, phase: 'paused', deadline: null } : current;
    }
    case 'resume':
      return state.phase === 'paused'
        ? { ...state, phase: 'running', deadline: action.now + state.remainingMs }
        : state;
    case 'tick': return syncTime(state, action.now);
    case 'reset': return createTimer();
  }
}

export function formatTimer(remainingMs: number): string {
  const seconds = Math.ceil(Math.max(0, remainingMs) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function getTimerTitle(state: TimerState): string {
  return state.phase === 'idle' ? 'LofLume — Home Work' : `LofLume | ${formatTimer(state.remainingMs)}`;
}
