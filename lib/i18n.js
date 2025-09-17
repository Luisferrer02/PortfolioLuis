import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/common.json'
import es from '@/locales/es/common.json'

let initialized = false

export function i18nInit() {
  if (initialized) return
  i18next
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en }, es: { translation: es } },
      lng: 'es',            // SSR/Export SIEMPRE ES para evitar mismatch
      fallbackLng: 'es',
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })
  initialized = true
}

export function detectAndSetLanguage() {
  try {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null
    const nav = typeof navigator !== 'undefined' ? navigator.language?.slice(0,2) : null
    const next = (saved || nav || 'es').startsWith('en') ? 'en' : 'es'
    if (i18next.language !== next) i18next.changeLanguage(next)
  } catch {}
}

export function appWithTranslation(App) {
  return function Wrapped(props) {
    i18nInit()
    return <App {...props} />
  }
}
