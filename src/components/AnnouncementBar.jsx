import { SITE } from '../data/site.js';

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-black text-white text-xs py-2 px-4 text-center tracking-widest uppercase">
      Envíos a todo el país (RD$) vía Metro & Caribe Pack | WhatsApp: {SITE.whatsappDisplay}
    </div>
  );
}
