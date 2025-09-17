export default function Section({ id, title, children }){
  return (
    <section id={id} className="max-w-5xl mx-auto px-4 py-16">
      {title && <h2 className="text-3xl md:text-4xl font-extrabold mb-8 border-b-4 border-black dark:border-white inline-block">{title}</h2>}
      {children}
    </section>
  )
}
