import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { SKILL_MODE } from '@/lib/featureFlags'

function abbr(label) {
  const parts = label.split(/\s|\//).filter(Boolean)
  const firsts = parts.slice(0, 2).map(p => p[0].toUpperCase()).join('')
  return firsts || label.slice(0, 2).toUpperCase()
}

export default function SkillBadge({ label, icon, iconLight, iconDark }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return <div className="skill-square">{abbr(label)}</div>
  }

  // Si hay versiones light/dark, elegir según el tema
  const chosenIcon = resolvedTheme === 'dark' ? iconDark || icon : iconLight || icon

  if (SKILL_MODE === 'text') {
    return <span className="skill-badge px-3 py-1 text-xs font-mono">{label}</span>
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className="skill-badge skill-square overflow-hidden grid place-items-center bg-white"
        title={label}
        aria-label={label}
      >
        {!chosenIcon || failed ? (
          <span className="text-xs font-mono select-none">{abbr(label)}</span>
        ) : (
          <img
            src={`/icons/${chosenIcon}`}
            alt={label}
            className="w-8 h-8 object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="text-[10px] font-mono text-center leading-tight">{label}</span>
    </div>
  )
}
