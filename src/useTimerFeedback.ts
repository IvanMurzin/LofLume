import { useCallback, useEffect, useRef, useState } from 'react';
import type { TimerState } from './timer.ts';
import { getTimerTitle } from './timer.ts';
import { TimerChime } from './timerChime.ts';

export function useTimerFeedback(state: TimerState, volume: number) {
  const chime = useRef<TimerChime | null>(null);
  const previousPhase = useRef(state.phase);
  const [noticeVisible, setNoticeVisible] = useState(false);
  const title = getTimerTitle(state);
  useEffect(() => {
    const signal = new TimerChime();
    chime.current = signal;
    const originalTitle = document.title;
    return () => {
      signal.dispose();
      chime.current = null;
      document.title = originalTitle;
    };
  }, []);
  useEffect(() => { document.title = title; }, [title]);
  useEffect(() => {
    const previous = previousPhase.current;
    previousPhase.current = state.phase;
    if (state.phase === 'finished' && previous === 'running') {
      setNoticeVisible(true);
      chime.current?.play(volume);
    } else if (state.phase === 'idle' || state.phase === 'running') {
      setNoticeVisible(false);
      if (state.phase === 'idle') chime.current?.cancel();
    }
  }, [state.phase, volume]);
  return {
    noticeVisible,
    dismissNotice: useCallback(() => setNoticeVisible(false), []),
    // Called synchronously by Start/Continue, within the user's audio gesture.
    prepareSound: useCallback(() => chime.current?.prepare(), []),
  };
}
