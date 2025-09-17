import { useEffect } from 'react'
export default function ProjectModal({ open, onClose, project }){
  useEffect(()=>{
    const onEsc = (e)=> e.key==='Escape' && onClose()
    document.addEventListener('keydown', onEsc)
    return ()=>document.removeEventListener('keydown', onEsc)
  },[onClose])
  if(!open || !project) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70" onClick={onClose}>
      <div className="card max-w-2xl w-[92%] p-6 bg-white dark:bg-black" onClick={(e)=>e.stopPropagation()}>
        <h3 className="text-3xl font-black mb-2">{project.title}</h3>
        <p className="mb-4">{project.description}</p>
        <ul className="list-disc pl-6 space-y-2 mb-6 text-sm">
          <li>Problem statement placeholder.</li>
          <li>Approach & stack placeholder.</li>
          <li>Results & metrics placeholder.</li>
        </ul>
        <div className="flex gap-3 justify-end">
          {project.links.github && <a className="btn" href={project.links.github} target="_blank" rel="noreferrer">GitHub</a>}
          {project.links.demo && <a className="btn" href={project.links.demo} target="_blank" rel="noreferrer">Demo</a>}
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
