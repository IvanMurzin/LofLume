import type { Locale } from './i18n.ts';
export type Fact = { id: string; text: Record<Locale, string>; source: string };

/** Uniform choice among eligible entries; the catalogue is loaded separately on demand. */
export function pickNextFactIndex(size: number, previous: number | null, random: () => number = Math.random): number {
  if (size < 1) throw new RangeError('A fact catalogue cannot be empty');
  if (size === 1) return 0;
  const exclude = previous !== null && previous >= 0 && previous < size;
  const next = Math.floor(random() * (size - (exclude ? 1 : 0)));
  return exclude && next >= previous ? next + 1 : next;
}
let request: Promise<Fact[]> | undefined;
export function loadFacts(): Promise<Fact[]> {
  return request ??= import('./platypusFacts.ts').then(module => module.platypusFacts).catch(error => {
    request = undefined;
    throw error;
  });
}
