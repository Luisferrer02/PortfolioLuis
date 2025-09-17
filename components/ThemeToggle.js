import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export default function ThemeToggle(){
  const { resolvedTheme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="btn invisible">XX</div>

  const current = resolvedTheme || 'light'
  const next = current === 'dark' ? 'light' : 'dark'

  return (
    <button
      className="btn hover:bg-[var(--muted)] transition-colors"
      onClick={() => setTheme(next)}
      aria-label={t(`themeToggle.toggleTo`, { mode: t(`themeToggle.${next}`) })}
      style={{minWidth:'5.5rem'}}
    >
      {t(`themeToggle.${current}`)}
    </button>
  )
}

/*
locales/en/common.json
"themeToggle": {"light": "Light", "dark": "Dark", "toggleTo": "Switch to {{mode}}"}

locales/es/common.json
"themeToggle": {"light": "Claro", "dark": "Oscuro", "toggleTo": "Cambiar a {{mode}}"}
*/
