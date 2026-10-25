import { useState } from 'react';
export const notesStorageKey = 'loflume.notes.v1';
function readNotes() {
  try { return { text: localStorage.getItem(notesStorageKey) ?? '', persistent: true }; }
  catch { return { text: '', persistent: false }; }
}
export function useNotes() {
  const [notes, setNotes] = useState(readNotes);
  return {
    ...notes,
    update(text: string) {
      let persistent = true;
      try { localStorage.setItem(notesStorageKey, text); } catch { persistent = false; }
      setNotes({ text, persistent });
    },
  };
}
