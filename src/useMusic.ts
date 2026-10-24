import { useEffect, useRef, useState } from 'react';
import { SceneMusic } from './music.ts';
import type { MusicState } from './music.ts';
import { tracks } from './tracks.ts';

function savedVolume(): number {
  try {
    const saved = localStorage.getItem('loflume.music.volume');
    if (saved !== null && Number.isFinite(Number(saved))) return Number(saved);
  } catch { /* Storage is optional. */ }
  return .45;
}

export function useMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<SceneMusic | null>(null);
  const [state, setState] = useState<MusicState>({ track: tracks[0]!, index: 0, phase: 'idle', volume: .45, error: null });
  useEffect(() => {
    const player = new SceneMusic(audioRef.current!, tracks, savedVolume());
    playerRef.current = player;
    const unsubscribe = player.subscribe(setState);
    return () => {
      unsubscribe();
      player.dispose();
      playerRef.current = null;
    };
  }, []);
  return {
    audioRef, state,
    startIfIdle() { if (playerRef.current?.state.phase === 'idle') void playerRef.current.play(); },
    toggle() { playerRef.current?.toggle(); },
    setVolume(value: number) {
      const player = playerRef.current;
      if (!player) return;
      player.setVolume(value);
      try { localStorage.setItem('loflume.music.volume', String(player.state.volume)); } catch { /* Optional. */ }
    },
  };
}
