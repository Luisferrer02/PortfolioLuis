// components/SkillBadge.js
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SKILL_MODE } from '@/lib/featureFlags'

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

function abbr(label) {
  const parts = label.split(/\s|\//).filter(Boolean)
  const firsts = parts.slice(0, 2).map(p => p[0].toUpperCase()).join('')
  return firsts || label.slice(0, 2).toUpperCase()
}

export default function SkillBadge({ label, icon, iconLight, iconDark }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [forceLight, setForceLight] = useState(false)

  useEffect(() => setMounted(true), [])
  // modo texto tal cual
  if (SKILL_MODE === 'text') {
    return <span className="skill-badge px-3 py-1 text-xs font-mono">{label}</span>
  }

  // elegir icono según tema
  const lightName = (iconLight || icon || '').replace(/^icons\//, '')
  const darkName  = (iconDark  || '').replace(/^icons\//, '')
  const wantDark  = (resolvedTheme === 'dark') && !forceLight
  const fileName  = wantDark ? (darkName || lightName) : lightName
  const src       = fileName ? `${base}/icons/${fileName}` : ''

  const onErr = () => {
    // si falla el dark, probamos light; si falla también -> abreviatura
    if (wantDark && lightName && !forceLight) setForceLight(true)
    else setFailed(true)
  }

  // Evitar mismatch de hidratación: antes de montar, muestra placeholder estable
  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="skill-badge skill-square grid place-items-center" style={{ background: '#fff' }}>
          <span className="text-xs font-mono select-none">{abbr(label)}</span>
        </div>
        <span className="text-[10px] font-mono text-center leading-tight">{label}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className="skill-badge skill-square overflow-hidden grid place-items-center"
        title={label}
        aria-label={label}
        style={{ background: '#fff' }} // interior siempre blanco
      >
        {!src || failed ? (
          <span className="text-xs font-mono select-none">{abbr(label)}</span>
        ) : (
          <img src={src} alt="" className="w-8 h-8 object-contain" onError={onErr} />
        )}
      </div>
      <span className="text-[10px] font-mono text-center leading-tight">{label}</span>
    </div>
  )
}
