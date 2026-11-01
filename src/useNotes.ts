import { useState } from 'react';
export const notesStorageKey = 'loflume.notes.v1';
function readNotes(storageKey: string) {
  try { return { text: localStorage.getItem(storageKey) ?? '', persistent: true }; }
  catch { return { text: '', persistent: false }; }
}
export function useNotes(storageKey = notesStorageKey) {
  const [notes, setNotes] = useState(() => readNotes(storageKey));
  return {
    ...notes,
    update(text: string) {
      let persistent = true;
      try { localStorage.setItem(storageKey, text); } catch { persistent = false; }
      setNotes({ text, persistent });
    },
  };
}
