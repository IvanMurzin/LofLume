import { useEffect, useRef, useState } from 'react';
import { cassetteStorageKey, restoreCassettes, serializeCassettes } from './cassettes.ts';
import type { Cassette, CassetteSlots } from './cassettes.ts';
import type { CassetteAction } from './CassetteSound.ts';
import { CassetteSound } from './CassetteSound.ts';

export function useCassettes() {
  const [slots, setSlots] = useState<CassetteSlots>(() => {
    try { return restoreCassettes(localStorage.getItem(cassetteStorageKey)); } catch { return [null, null, null]; }
  });
  const [persistent, setPersistent] = useState(true);
  const sound = useRef<CassetteSound | null>(null);
  useEffect(() => { sound.current = new CassetteSound(); return () => { sound.current?.dispose(); sound.current = null; }; }, []);
  const save = (slot: number, tape: Cassette | null) => {
    if (!Number.isInteger(slot) || slot < 0 || slot > 2) return;
    const next = [...slots] as CassetteSlots;
    next[slot] = tape; setSlots(next);
    try { localStorage.setItem(cassetteStorageKey, serializeCassettes(next)); setPersistent(true); } catch { setPersistent(false); }
  };
  return { slots, persistent, save, playSound(volume: number, action: CassetteAction) { sound.current?.play(volume, action); } };
}
