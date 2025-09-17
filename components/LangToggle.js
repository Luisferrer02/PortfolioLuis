// components/LangToggle.js
import i18next from 'i18next'
export default function LangToggle(){
  const toggle = () => {
    const next = i18next.language === 'es' ? 'en' : 'es'
    i18next.changeLanguage(next)
    localStorage.setItem('i18nextLng', next)
  }
  return <button className="btn" onClick={toggle}>{(i18next.language || 'es').toUpperCase()}</button>
}
