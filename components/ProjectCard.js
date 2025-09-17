export default function ProjectCard({ project, onOpen }){
  const { title, tags, description, links } = project
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="text-2xl font-black">{title}</h3>
        <button onClick={()=>onOpen(project)} className="btn">Details</button>
      </div>
      <p className="mb-3 text-sm md:text-base">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(t => <span key={t} className="px-2 py-1 border-2 border-black dark:border-white text-xs font-mono">{t}</span>)}
      </div>
      <div className="flex gap-3">
        {links.github && <a className="btn" href={links.github} target="_blank" rel="noreferrer">GitHub</a>}
        {links.demo && <a className="btn" href={links.demo} target="_blank" rel="noreferrer">Demo</a>}
      </div>
    </div>
  )
}
