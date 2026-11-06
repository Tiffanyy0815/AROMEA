import { FAQ } from '../data/faq.js';

// <details> da un acordeón accesible sin JavaScript extra.
export default function Faq() {
  return (
    <section className="py-16 max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <h4 className="font-serif text-3xl font-normal mb-2">Preguntas Frecuentes</h4>
        <p className="text-stone-500 text-xs tracking-widest uppercase">Información útil sobre entregas y compras</p>
      </div>

      <div className="space-y-4 text-sm">
        {FAQ.map((f) => (
          <details key={f.id} className="group border border-brand-sand bg-white p-5 rounded-sm">
            <summary className="cursor-pointer list-none font-semibold text-base flex justify-between items-center">
              {f.pregunta}
              <span className="text-stone-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
            </summary>
            <p className="text-stone-600 text-xs leading-relaxed mt-2">{f.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
