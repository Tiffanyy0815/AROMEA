export default function About() {
  return (
    <section className="py-16 bg-white border-b border-brand-sand">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-stone-400 font-semibold mb-2 block">Nuestra Filosofía</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-6 tracking-wide">La belleza de lo esencial</h2>
        <p className="text-stone-600 leading-relaxed font-light text-base sm:text-lg mb-6">
          En <strong className="font-semibold text-brand-black">AROMÉA</strong> creemos que la belleza se encuentra en los pequeños detalles y en la simplicidad de lo natural. Nacimos con la idea de crear una experiencia donde el cuidado personal se convierta en un momento de tranquilidad, bienestar y conexión contigo mismo.
        </p>
        <p className="text-stone-600 leading-relaxed font-light text-base sm:text-lg mb-8">
          Nuestra filosofía se basa en el minimalismo, la elegancia y la autenticidad. Apostamos por productos cuidadosamente seleccionados y una esencia que transmite serenidad, armonía y sofisticación.
        </p>
        <div className="inline-block border-y border-brand-taupe/40 py-3 px-8">
          <p className="font-serif italic text-lg sm:text-xl text-stone-800">“Elegancia y Cuidado. Esa es nuestra esencia.”</p>
        </div>
      </div>
    </section>
  );
}
