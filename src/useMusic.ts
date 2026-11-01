import { useEffect, useRef, useState } from 'react';
import { SceneMusic } from './music.ts';
import type { MusicState } from './music.ts';
import { tracks } from './tracks.ts';

function savedVolume(storageKey: string): number {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null && Number.isFinite(Number(saved))) return Number(saved);
  } catch { /* Storage is optional. */ }
  return .45;
}

export function useMusic(storageKey = 'loflume.music.volume') {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<SceneMusic | null>(null);
  const [state, setState] = useState<MusicState>({ track: tracks[0]!, index: 0, phase: 'idle', volume: .45, error: null });
  useEffect(() => {
    const player = new SceneMusic(audioRef.current!, tracks, savedVolume(storageKey));
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
    toggle() { playerRef.current?.toggle(); },
    pause() { playerRef.current?.pause(); },
    setVolume(value: number) {
      const player = playerRef.current;
      if (!player) return;
      player.setVolume(value);
      try { localStorage.setItem(storageKey, String(player.state.volume)); } catch { /* Optional. */ }
    },
  };
}
