import { useEffect, useRef, useState } from 'react';
import { RainSound } from './rainSound.ts';
export function useRain() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState(false);
  const sound = useRef<RainSound | null>(null);
  const desired = useRef(false);
  const request = useRef(0);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; desired.current = false; sound.current?.dispose(); sound.current = null; };
  }, []);
  async function toggle() {
    const revision = ++request.current;
    const next = !desired.current;
    desired.current = next; setEnabled(next); setError(false);
    if (!next) { sound.current?.stop(); return; }
    try { sound.current ??= new RainSound(); await sound.current.start(); }
    catch { if (mounted.current && desired.current && revision === request.current) { desired.current = false; setEnabled(false); setError(true); } }
  }
  return { enabled, error, toggle };
}
