export default function Timeline({ items }) {
  return (
    <ol className="relative border-l-4" style={{ borderColor: "var(--ink)" }}>
      {items.map((it, idx) => (
        <li key={idx} className="card p-4 ml-6 my-6">
          <div className="flex items-baseline justify-between mb-2">
            <h4 className="text-xl font-extrabold">{it.title}</h4>
            <span className="text-sm md:text-base font-mono opacity-90">
              {it.meta}
            </span>
          </div>
          {it.subtitle && (
            <p className="text-sm md:text-base mb-2 opacity-95">
              {it.subtitle}
            </p>
          )}
          {it.points?.length > 0 && (
            <ul className="list-disc pl-6 space-y-1 text-sm md:text-base">
              {it.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
