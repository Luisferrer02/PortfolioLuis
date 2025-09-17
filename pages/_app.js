// pages/_app.js
import '@/styles/globals.css'
import { appWithTranslation } from '@/lib/i18n'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { detectAndSetLanguage } from '@/lib/i18n' // si ya lo tienes, úsalo

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 1) Marcamos el doc como "montado" para CSS
    document.documentElement.classList.add('app-mounted')
    // 2) Ajustamos idioma tras hidratar (evita mismatch)
    detectAndSetLanguage?.()
    setMounted(true)
  }, [])

  if (!mounted) {
    // Evita cualquier render hasta que montamos (cero flicker)
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
