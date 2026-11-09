import { SITE } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div>
          <span className="font-serif text-2xl tracking-widest block mb-3">{SITE.name}</span>
          <p className="text-xs text-stone-400 leading-relaxed mb-4">
            Maison de cosmética, perfumería de autor y marroquinería fina. Diseñado para realzar la belleza natural con sutileza.
          </p>
          <p className="text-xs text-amber-200">📍 {SITE.location}</p>
        </div>

        <div>
          <h5 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">Redes Sociales & Contacto</h5>
          <ul className="space-y-2 text-xs text-stone-300">
            <li><a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noreferrer" className="hover:text-amber-200">Instagram: @{SITE.instagram}</a></li>
            <li><a href={`https://tiktok.com/@${SITE.tiktok}`} target="_blank" rel="noreferrer" className="hover:text-amber-200">TikTok: @{SITE.tiktok}</a></li>
            <li><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-amber-200">WhatsApp: {SITE.whatsappDisplay}</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs uppercase tracking-widest text-stone-400 mb-4 font-semibold">Servicio en RD</h5>
          <p className="text-xs text-stone-400 leading-relaxed mb-2">Atención al cliente vía WhatsApp de {SITE.schedule}.</p>
          <p className="text-xs text-stone-500">© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
