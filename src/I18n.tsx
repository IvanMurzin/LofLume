import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { detectLocale, languagePreferenceKey, languages, resolveLocale, restoreLanguagePreference, translate } from './i18n.ts';
import type { LanguagePreference, Locale, MessageKey, Parameters } from './i18n.ts';
type I18nValue = {
  locale: Locale; autoLocale: Locale; preference: LanguagePreference; persistent: boolean;
  setPreference: (value: LanguagePreference) => void;
  t: (key: MessageKey, parameters?: Parameters) => string;
  providers: { youtube: string; spotify: string; yandex: string };
};
const Context = createContext<I18nValue | null>(null);
function browserLanguages() { return navigator.languages?.length ? [...navigator.languages] : [navigator.language]; }
function savedPreference() {
  try { return { preference: restoreLanguagePreference(localStorage.getItem(languagePreferenceKey)), persistent: true }; }
  catch { return { preference: 'auto' as const, persistent: false }; }
}
export function I18nProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState(savedPreference);
  const [preferred, setPreferred] = useState(browserLanguages);
  const locale = resolveLocale(choice.preference, preferred), autoLocale = detectLocale(preferred);
  const setPreference = useCallback((preference: LanguagePreference) => {
    let persistent = true;
    try { if (preference === 'auto') localStorage.removeItem(languagePreferenceKey); else localStorage.setItem(languagePreferenceKey, preference); }
    catch { persistent = false; }
    setChoice({ preference, persistent });
  }, []);
  useEffect(() => {
    const update = () => setPreferred(browserLanguages());
    window.addEventListener('languagechange', update);
    return () => window.removeEventListener('languagechange', update);
  }, []);
  useLayoutEffect(() => { document.documentElement.lang = locale; document.documentElement.dir = languages[locale].direction; }, [locale]);
  const value = useMemo<I18nValue>(() => ({ locale, autoLocale, ...choice, setPreference,
    t: (key, parameters) => translate(locale, key, parameters),
    providers: { youtube: translate(locale, 'providerYoutube'), spotify: translate(locale, 'providerSpotify'), yandex: translate(locale, 'providerYandex') },
  }), [locale, autoLocale, choice, setPreference]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useI18n() {
  const value = useContext(Context);
  if (!value) throw new Error('I18nProvider is missing');
  return value;
}
