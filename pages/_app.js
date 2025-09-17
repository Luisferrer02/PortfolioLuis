import '@/styles/globals.css'
import { appWithTranslation } from '@/lib/i18n'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)

