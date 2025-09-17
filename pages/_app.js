import '@/styles/globals.css'
import { appWithTranslation } from '@/lib/i18n'
import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { detectAndSetLanguage } from '@/lib/i18n'

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('app-mounted')
    detectAndSetLanguage?.()
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
