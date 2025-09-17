export default function Timeline({ items }){
  return (
    <ol className="relative border-l-4 border-black dark:border-white pl-6 space-y-8">
      {items.map((it, idx)=> (
        <li key={idx} className="card p-4">
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="text-xl font-extrabold">{it.title}</h4>
            <span className="text-xs md:text-sm font-mono">{it.meta}</span>
          </div>
          <p className="text-sm md:text-base mb-2">{it.subtitle}</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            {it.points.map((p,i)=>(<li key={i}>{p}</li>))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

