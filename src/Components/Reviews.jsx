import { Star } from 'lucide-react';
import { REVIEWS } from '../data/reviews.js';

export default function Reviews() {
  return (
    <section className="py-16 bg-brand-sand/30 border-y border-brand-sand">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.2em] uppercase text-stone-500 font-semibold block mb-1">Opiniones Verificadas</span>
          <h3 className="font-serif text-3xl font-normal">Lo que dicen nuestras clientas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <figure key={r.id} className="bg-white p-6 rounded-sm shadow-sm border border-brand-sand flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3" aria-label={`${r.rating} de 5 estrellas`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-stone-700 text-sm leading-relaxed mb-4">“{r.texto}”</blockquote>
              </div>
              <figcaption className="border-t border-stone-100 pt-3 flex items-center justify-between">
                <span className="font-semibold text-xs tracking-wider uppercase">{r.autora}</span>
                <span className="text-[10px] text-stone-400">Compra verificada</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
