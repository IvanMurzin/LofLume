import { en } from './locales/en.ts';
import { ru } from './locales/ru.ts';
export const languages = {
  en: { nativeName: 'English', direction: 'ltr', messages: en },
  ru: { nativeName: 'Русский', direction: 'ltr', messages: ru },
} as const;
export type Locale = keyof typeof languages;
export type LanguagePreference = Locale | 'auto';
export type MessageKey = keyof typeof en;
export type Parameters = Record<string, string | number>;
export const languagePreferenceKey = 'loflume.locale.v1';
export const localeCodes = Object.keys(languages) as Locale[];
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && Object.hasOwn(languages, value);
}
export function restoreLanguagePreference(value: unknown): LanguagePreference { return isLocale(value) ? value : 'auto'; }
export function detectLocale(preferred: readonly string[]): Locale {
  for (const language of preferred) {
    if (typeof language !== 'string') continue;
    let candidate = language.trim().toLowerCase().replaceAll('_', '-');
    while (candidate) {
      if (isLocale(candidate)) return candidate;
      const separator = candidate.lastIndexOf('-');
      candidate = separator < 0 ? '' : candidate.slice(0, separator);
    }
  }
  return 'en';
}
export function resolveLocale(preference: unknown, preferred: readonly string[]): Locale {
  return isLocale(preference) ? preference : detectLocale(preferred);
}
export function translate(locale: Locale, key: MessageKey, parameters: Parameters = {}): string {
  const message: string = languages[locale]?.messages[key] ?? en[key];
  return message.replace(/\{(\w+)\}/g, (token, name: string) => Object.hasOwn(parameters, name) ? String(parameters[name]) : token);
}
