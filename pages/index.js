// pages/index.js
import { useTranslation } from 'react-i18next'
import { i18nInit } from '@/lib/i18n'
import Section from '@/components/Section'
import ThemeToggle from '@/components/ThemeToggle'
import LangToggle from '@/components/LangToggle'
import FilterBar from '@/components/FilterBar'
import ProjectCard from '@/components/ProjectCard'
import ProjectModal from '@/components/ProjectModal'
import Timeline from '@/components/Timeline'
import SkillBadge from '@/components/SkillBadge'
import NavBrand from '@/components/NavBrand'
import { useMemo, useState } from 'react'
import { SHOW_HERO_PLACEHOLDER, HERO_MAX_W, HERO_MAX_H, HERO_ROUNDED } from '@/lib/config'
import { withBase } from '@/lib/paths'
import i18next from 'i18next'

i18nInit()

const cvHref = () => {
  const path = (i18next.language || 'es').startsWith('en') ? '/cv/en.pdf' : '/cv/es.pdf'
  return withBase(path)
}

const PROJECTS = Array.from({length: 6}).map((_,i)=> ({
  id: i+1,
  title: `Project ${i+1}`,
  type: i%3===0? 'web' : i%3===1? 'ml' : 'mobile',
  tags: i%3===0? ['Next.js','Tailwind','Node'] : i%3===1? ['Python','Pandas','CNN'] : ['React Native','Expo'],
  description: 'Short description goes here. Replace with your real project when ready.',
  links: { github: 'https://github.com/luisferrer02', demo: 'https://luisferrer02.github.io/portfolio' }
}))

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
    <path d="M12 3v12"/><path d="M6 9l6 6 6-6"/><path d="M5 21h14"/>
  </svg>
)

export default function Home(){
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  const filtered = useMemo(()=> filter==='all' ? PROJECTS : PROJECTS.filter(p=>p.type===filter), [filter])
  const openModal = (p)=>{ setActive(p); setOpen(true) }

  return (
    <main className="min-h-screen font-display">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur border-b-2" style={{borderColor:'var(--ink)'}}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <NavBrand />
          <nav className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-8 text-sm lg:text-base">
            <a className="nav-link min-w-[10ch] text-center" href="#projects">{t('nav.projects')}</a>
            <a className="nav-link min-w-[10ch] text-center" href="#about">{t('nav.about')}</a>
            <a className="nav-link min-w-[12ch] text-center" href="#skills">{t('nav.skills')}</a>
            <a className="nav-link min-w-[12ch] text-center" href="#experience">{t('nav.experience')}</a>
            <a className="nav-link min-w-[11ch] text-center" href="#education">{t('nav.education')}</a>
            <a className="nav-link min-w-[9ch]  text-center" href="#contact">{t('nav.contact')}</a>
          </nav>
          <div className="flex gap-3 shrink-0">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* HERO */}
      <Section id="top">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="px-2 py-1 text-xs font-mono" style={{border:'2px solid var(--ink)'}}>{t('hero.badge')}</span>
            <h1 className="text-5xl md:text-6xl font-black mt-4">{t('hero.headline')}</h1>
            <p className="mt-3 text-lg md:text-xl max-w-prose opacity-95">{t('hero.sub')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href="#projects">{t('hero.ctaProjects')}</a>
              <a className="btn" href={cvHref()} download><IconDownload/>{t('hero.ctaCV')}</a>
            </div>
          </div>
          {SHOW_HERO_PLACEHOLDER ? (
            <div className={`frame-fixed ${HERO_ROUNDED}`} style={{maxWidth: HERO_MAX_W, maxHeight: HERO_MAX_H}}>
              <span className="opacity-70">Portrait placeholder</span>
            </div>
          ) : null}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title={t('projects.title')}>
        <FilterBar filters={t('projects.filters', { returnObjects: true })} current={filter} onChange={setFilter} />
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(p => (<ProjectCard key={p.id} project={p} onOpen={openModal} />))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" title={t('about.title')}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 text-sm md:text-base leading-relaxed card p-6">{t('about.text')}</div>
          <div className="card p-6 space-y-3">
            <div className="font-black">Links</div>
            <div className="grid gap-3">
              <a className="link-tile" href="mailto:luisferrer2002@gmail.com"><span>luisferrer2002@gmail.com</span><span>↗</span></a>
              <a className="link-tile" href="https://luisferrer02.github.io/portfolio" target="_blank" rel="noreferrer"><span>Website</span><span>↗</span></a>
              <a className="link-tile" href="https://www.linkedin.com/in/luis-ferrer-0a54731b1" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>↗</span></a>
              <a className="link-tile" href="https://github.com/luisferrer02" target="_blank" rel="noreferrer"><span>GitHub</span><span>↗</span></a>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title={t('skills.title')}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.fullstack')}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {label:'JavaScript', icon:'javascript.svg'},
                {label:'React', icon:'react.svg'},
                {label:'Next.js', icon:'nextjs.svg'},
                {label:'Node.js', icon:'node.svg'},
                {label:'Java', icon:'java.svg'},
                {label:'HTML/CSS', icon:'html.svg'},
                {label:'Kotlin', icon:'kotlin.svg'},
                {label:'C++', icon:'cpp.svg'}
              ].map(s=> <SkillBadge key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.databases')}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {label:'SQL', icon:'sql.svg'},
                {label:'MongoDB', icon:'mongodb.svg'},
                {label:'Redis', icon:'redis.svg'}
              ].map(s=> <SkillBadge key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.workflow')}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                 {label:'Git', icon:'github.svg'},
                {label:'Agile', icon:'jira.svg'},
                {label:'Linux', icon:'linux.svg'},
                {label:'Docker', icon:'docker.svg'},
                {label:'Jupyter', icon:'jupyter.svg'}
              ].map(s=> <SkillBadge key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.dsai')}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {label:'Python', icon:'python.svg'},
                {label:'Deep Learning', icon:'deep-learning.png'},
                {label:'Machine Learning', icon:'ml.svg'},
                {label:'CNN', icon:'cnn.png'}
              ].map(s=> <SkillBadge key={s.label} label={s.label} icon={s.icon} />)}
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title={t('experience.title')}>
        <Timeline items={[
          { title: t('experience.juniperTitle'), meta: t('experience.juniperDates'), subtitle: 'Juniper Travel Technology', points: t('experience.juniperBullets', { returnObjects: true }) },
          { title: t('experience.ericssonTitle'), meta: t('experience.ericssonDates'), subtitle: 'Ericsson', points: t('experience.ericssonBullets', { returnObjects: true }) },
        ]} />
      </Section>

      {/* EDUCATION */}
      <Section id="education" title={t('education.title')}>
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold">{t('education.utad')}</h3>
            <span className="text-sm md:text-base font-mono opacity-90">{t('education.utadMeta')}</span>
          </div>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm md:text-base">
            {t('education.utadBullets', { returnObjects: true }).map((x,i)=> <li key={i}>{x}</li>)}
          </ul>
          <a className="btn mt-3 inline-flex" href="https://u-tad.com/" target="_blank" rel="noreferrer">u-tad.com ↗</a>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title={t('contact.title')}>
        <div className="grid md:grid-cols-3 gap-6">
          <a className="card p-6 block" href="mailto:luisferrer2002@gmail.com">
            <div className="font-black">{t('contact.email')}</div>
            <div>luisferrer2002@gmail.com</div>
          </a>
          <a className="card p-6 block btn" href={withBase('/cv/en.pdf')} download>
            <IconDownload />{t('contact.cv')}
          </a>
          <a className="card p-6 block btn" href={withBase('/cv/es.pdf')} download>
            <IconDownload />{t('contact.cvEs')}
          </a>
        </div>
      </Section>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-xs opacity-70">
        © {new Date().getFullYear()} Luis Ferrer · Built with Next.js & Tailwind · Hosted on GitHub Pages
      </footer>

      <ProjectModal open={open} onClose={()=>setOpen(false)} project={active} />
    </main>
  )
}
