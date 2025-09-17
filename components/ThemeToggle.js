import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

/**
 * mode = 'toggle' -> alterna light/dark
 * mode = 'cycle'  -> recorre system -> light -> dark
 */
export default function ThemeToggle({ mode = 'toggle' }) {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Evita hydration mismatch con next-themes
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const current = resolvedTheme || theme || 'light'

  const nextMode = (() => {
    if (mode === 'cycle') {
      const order = ['system', 'light', 'dark']
      const i = order.indexOf(current)
      return order[(i + 1) % order.length]
    }
    // toggle: solo light/dark
    return current === 'dark' ? 'light' : 'dark'
  })()

  const handleClick = () => setTheme(nextMode)

  // Texto localizado del "siguiente" estado
  const nextLabel = t(`themeToggle.${nextMode}`)
  const ariaLabel = t('themeToggle.toggleTo', { mode: nextLabel })

  return (
    <button
      className="btn uppercase"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={current === 'dark'}
      title={ariaLabel}
    >
      {nextLabel}
    </button>
  )
}
