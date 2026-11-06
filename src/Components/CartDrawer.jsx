import { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useModal } from '../hooks/useModal.js';
import { PAYMENT_METHODS } from '../data/site.js';
import { formatPrice } from '../utils/format.js';
import { buildOrderUrl } from '../utils/whatsapp.js';
import CartItem from './CartItem.jsx';

export default function CartDrawer() {
  const { lines, total, isOpen, closeCart } = useCart();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value);

  useModal(isOpen, closeCart);
  if (!isOpen) return null;

  const finalizar = () => {
    if (lines.length === 0) return;
    window.open(buildOrderUrl({ lines, total, paymentMethod, user }), '_blank', 'noopener');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <div onClick={closeCart} className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          <div className="p-6 bg-brand-beige border-b border-brand-sand flex items-center justify-between">
            <h2 className="font-serif text-xl font-medium tracking-wide">Tu Carrito de Compras</h2>
            <button onClick={closeCart} aria-label="Cerrar carrito" className="text-stone-500 hover:text-black">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {lines.length === 0 ? (
              <p className="text-center text-stone-500 text-sm py-8">Tu carrito está vacío.</p>
            ) : (
              lines.map((l) => <CartItem key={l.product.id} product={l.product} qty={l.qty} />)
            )}
          </div>

          <div className="p-6 border-t border-brand-sand bg-brand-beige/50">
            <label htmlFor="payment-method" className="block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-2">
              Método de Pago
            </label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-stone-300 bg-white p-2 text-xs mb-4 focus:border-brand-black outline-none"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>

            <div className="flex justify-between text-base font-semibold text-stone-900 mb-4">
              <p>Subtotal</p>
              <p>{formatPrice(total)}</p>
            </div>

            <button
              onClick={finalizar}
              disabled={lines.length === 0}
              className="w-full bg-brand-black text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Finalizar Pedido vía WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
