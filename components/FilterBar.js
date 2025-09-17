export default function FilterBar({ filters, current, onChange }){
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {Object.entries(filters).map(([k, label])=> (
        <button key={k} onClick={()=>onChange(k)} className={`btn ${current===k? 'bg-black text-white dark:bg-white dark:text-black':''}`}>{label}</button>
      ))}
    </div>
  )
}
