import { useTheme } from 'next-themes'
export default function ThemeToggle(){
  const { theme, setTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button className="btn" onClick={()=>setTheme(next)} aria-label="Toggle theme">{next.toUpperCase()}</button>
  )
}
