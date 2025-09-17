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
import { useMemo, useState } from 'react'

i18nInit()

const PROJECTS = Array.from({length: 6}).map((_,i)=> ({
  id: i+1,
  title: `Project ${i+1}`,
  type: i%3===0? 'web' : i%3===1? 'ml' : 'mobile',
  tags: i%3===0? ['Next.js','Tailwind','Node'] : i%3===1? ['Python','Pandas','CNN'] : ['React Native','Expo'],
  description: 'Short description goes here. Replace with your real project when ready.',
  links: { github: 'https://github.com/luisferrer02', demo: 'https://luisferrer02.github.io/portfolio' }
}))

export default function Home(){
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  const filtered = useMemo(()=> filter==='all' ? PROJECTS : PROJECTS.filter(p=>p.type===filter), [filter])

  const openModal = (p)=>{ setActive(p); setOpen(true) }

  return (
    <main className="min-h-screen font-display bg-white text-black dark:bg-black dark:text-white">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur border-b-2 border-black dark:border-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="w-9 h-9 card grid place-items-center font-black">LF</div>
            <span className="font-extrabold tracking-tight">Luis Ferrer Forteza</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 font-bold uppercase">
            <a href="#projects">{t('nav.projects')}</a>
            <a href="#about">{t('nav.about')}</a>
            <a href="#skills">{t('nav.skills')}</a>
            <a href="#experience">{t('nav.experience')}</a>
            <a href="#education">{t('nav.education')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </nav>
          <div className="flex gap-3">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* HERO */}
      <Section id="top">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="px-2 py-1 border-2 border-black dark:border-white text-xs font-mono">{t('hero.badge')}</span>
            <h1 className="text-5xl md:text-6xl font-black mt-4">{t('hero.headline')}</h1>
            <p className="mt-3 text-lg md:text-xl max-w-prose">{t('hero.sub')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href="#projects">{t('hero.ctaProjects')}</a>
              <a className="btn" href="/cv/en.pdf" download>{t('hero.ctaCV')}</a>
            </div>
          </div>
          <div className="w-full h-64 md:h-72 card grid place-items-center">Portrait placeholder</div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title={t('projects.title')}>
        <FilterBar filters={t('projects.filters', { returnObjects: true })} current={filter} onChange={setFilter} />
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={openModal} />
          ))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" title={t('about.title')}>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 text-sm md:text-base leading-relaxed card p-6">{t('about.text')}</div>
          <div className="card p-6 space-y-3">
            <div className="font-black">Links</div>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><a className="underline" href="mailto:luisferrer2002@gmail.com">luisferrer2002@gmail.com</a></li>
              <li><a className="underline" href="https://luisferrer02.github.io/portfolio" target="_blank" rel="noreferrer">Website</a></li>
              <li><a className="underline" href="https://www.linkedin.com/in/luis-ferrer-0a54731b1" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a className="underline" href="https://github.com/luisferrer02" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title={t('skills.title')}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.fullstack')}</h3>
            <div className="flex flex-wrap gap-2">
              {['JavaScript','React','Next.js','Node.js','Java','HTML/CSS','Kotlin','C++'].map(s=> <SkillBadge key={s} label={s} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.databases')}</h3>
            <div className="flex flex-wrap gap-2">
              {['SQL (Advanced)','MongoDB (Advanced)','Redis (Proficient)'].map(s=> <SkillBadge key={s} label={s} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.workflow')}</h3>
            <div className="flex flex-wrap gap-2">
              {['Git','Agile/Scrum','Linux','Docker','Jupyter Notebooks'].map(s=> <SkillBadge key={s} label={s} />)}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-extrabold mb-3">{t('skills.groups.dsai')}</h3>
            <div className="flex flex-wrap gap-2">
              {['Python (Advanced)','Deep Learning','Machine Learning','CNN'].map(s=> <SkillBadge key={s} label={s} />)}
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
            <span className="text-xs font-mono">{t('education.utadMeta')}</span>
          </div>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
            {t('education.utadBullets', { returnObjects: true }).map((x,i)=> <li key={i}>{x}</li>)}
          </ul>
          <a className="underline mt-3 inline-block" href="https://u-tad.com/" target="_blank" rel="noreferrer">u-tad.com</a>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title={t('contact.title')}>
        <div className="grid md:grid-cols-3 gap-6">
          <a className="card p-6 block" href="mailto:luisferrer2002@gmail.com"><div className="font-black">{t('contact.email')}</div><div>luisferrer2002@gmail.com</div></a>
          <a className="card p-6 block" href="/cv/en.pdf" download>{t('contact.cv')}</a>
          <a className="card p-6 block" href="/cv/es.pdf" download>{t('contact.cvEs')}</a>
        </div>
      </Section>

      <footer className="max-w-5xl mx-auto px-4 py-10 text-xs opacity-70">
        © {new Date().getFullYear()} Luis Ferrer · Built with Next.js & Tailwind · Hosted on GitHub Pages
      </footer>

      <ProjectModal open={open} onClose={()=>setOpen(false)} project={active} />
    </main>
  )
}
