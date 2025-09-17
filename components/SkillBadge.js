import { useState } from 'react'
import { SKILL_MODE } from '@/lib/featureFlags'

function abbr(label) {
  const parts = label.split(/\s|\//).filter(Boolean)
  const firsts = parts.slice(0, 2).map(p => p[0].toUpperCase()).join('')
  return firsts || label.slice(0, 2).toUpperCase()
}

export default function SkillBadge({ label, icon }) {
  if (SKILL_MODE === 'text') {
    return <span className="skill-badge px-3 py-1 text-xs font-mono">{label}</span>
  }

  // ICONS mode: un único cuadrado con borde. Dentro va el icono (object-contain).
  // Si no hay icono o falla la carga, mostramos la abreviatura dentro del cuadrado.
  const filename = icon?.replace(/^icons\//, '') || ''
  const [failed, setFailed] = useState(false)

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
            src={`/icons/${filename}`}
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
