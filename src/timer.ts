export type TimerState = {
  phase: 'idle' | 'running' | 'paused' | 'finished';
  remainingMs: number;
  deadline: number | null;
};
export type TimerAction =
  | { type: 'start'; minutes: number; now: number }
  | { type: 'pause' | 'resume' | 'tick'; now: number }
  | { type: 'reset' };

export function createTimer(): TimerState {
  return { phase: 'idle', remainingMs: 0, deadline: null };
}

export function parseMinutes(input: string): number | null {
  if (!/^\d+$/.test(input.trim())) return null;
  const minutes = Number(input);
  return Number.isInteger(minutes) && minutes >= 1 && minutes <= 180 ? minutes : null;
}

export function parseTimerDuration(hours: string, minutes: string): number | null {
  if (!/^\d{1,2}$/.test(hours) || !/^\d{1,2}$/.test(minutes)) return null;
  const h = Number(hours), m = Number(minutes);
  if (h > 3 || m > 59) return null;
  return parseMinutes(String(h * 60 + m));
}

export function clampTimerDuration(hours: string, minutes: string): { hours: string; minutes: string } {
  const clampPart = (input: string, max: number) => {
    const digits = input.replace(/\D/g, '').slice(0, 2);
    if (!digits) return '';
    return Number(digits) > max ? String(max).padStart(2, '0') : digits;
  };
  const h = clampPart(hours, 3);
  const m = Number(h) === 3 ? '00' : clampPart(minutes, 59);
  return { hours: h, minutes: m };
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
      if (state.phase === 'running' || state.phase === 'paused' || parseMinutes(String(action.minutes)) === null) return state;
      const remainingMs = action.minutes * 60_000;
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
