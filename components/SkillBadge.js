// components/SkillBadge.js
import { useState } from 'react'
import { SKILL_MODE } from '@/lib/featureFlags'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

function abbr(label) {
  const parts = label.split(/\s|\//).filter(Boolean)
  const firsts = parts.slice(0, 2).map(p => p[0].toUpperCase()).join('')
  return firsts || label.slice(0, 2).toUpperCase()
}

export default function SkillBadge({ label, icon }) {
  if (SKILL_MODE === 'text') {
    return <span className="skill-badge px-3 py-1 text-xs font-mono">{label}</span>
  }

  // ICONS mode: un único cuadrado con borde. Icono dentro; si falla, abreviatura.
  const filename = icon?.replace(/^icons\//, '') || ''
  const [failed, setFailed] = useState(false)
  const src = filename ? `${base}/icons/${filename}` : ''

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className="skill-badge skill-square overflow-hidden grid place-items-center"
        title={label}
        aria-label={label}
      >
        {!filename || failed ? (
          <span className="text-xs font-mono select-none">{abbr(label)}</span>
        ) : (
          <img
            src={src}
            alt=""
            className="w-8 h-8 object-contain"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <span className="text-[10px] font-mono text-center leading-tight">{label}</span>
    </div>
  )
}
