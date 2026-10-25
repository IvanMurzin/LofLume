import { useCallback, useEffect, useRef, useState } from 'react';
import type { TimerState } from './timer.ts';
import { TimerChime } from './timerChime.ts';

type ClockFeedback = { title: string; completionId: number; mode: string };
export function useTimerFeedback(state: TimerState, volume: number, feedback: ClockFeedback) {
  const chime = useRef<TimerChime | null>(null);
  const previous = useRef({ phase: state.phase, event: feedback.completionId, mode: feedback.mode });
  const [noticeVisible, setNoticeVisible] = useState(false);
  useEffect(() => {
    const signal = new TimerChime(); chime.current = signal;
    const originalTitle = document.title;
    return () => { signal.dispose(); chime.current = null; document.title = originalTitle; };
  }, []);
  useEffect(() => { document.title = feedback.title; }, [feedback.title]);
  useEffect(() => {
    const before = previous.current;
    previous.current = { phase: state.phase, event: feedback.completionId, mode: feedback.mode };
    if (before.mode !== feedback.mode || state.phase === 'idle') { setNoticeVisible(false); chime.current?.cancel(); }
    else if (feedback.completionId !== before.event) { setNoticeVisible(true); chime.current?.play(volume); }
    else if (state.phase === 'running' && before.phase !== 'running') setNoticeVisible(false);
  }, [state.phase, volume, feedback.completionId, feedback.mode]);
  return {
    noticeVisible,
    dismissNotice: useCallback(() => setNoticeVisible(false), []),
    prepareSound: useCallback(() => chime.current?.prepare(), []),
  };
}
