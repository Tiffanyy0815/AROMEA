import { Instagram, Phone, ShoppingBag, User } from 'lucide-react';
import { SITE } from '../data/site.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, openAuth } = useAuth();
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-brand-beige/90 backdrop-blur-md border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-5 w-1/3">
          <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
            <Instagram className="w-5 h-5" />
          </a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:opacity-75 transition-opacity text-green-700">
            <Phone className="w-5 h-5" />
          </a>
        </div>

        <a href="#" className="text-center">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] block">{SITE.name}</span>
          <span className="text-[9px] tracking-[0.3em] text-stone-500 uppercase font-medium">{SITE.tagline}</span>
        </a>

        <div className="flex items-center justify-end space-x-6 w-1/3">
          <button onClick={openAuth} className="flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold hover:opacity-75 focus:outline-none">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline max-w-[8rem] truncate">{user?.nombre || 'Cuenta'}</span>
          </button>

          <button onClick={openCart} aria-label="Abrir carrito" className="relative p-1 hover:opacity-75 focus:outline-none">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-brand-black text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
