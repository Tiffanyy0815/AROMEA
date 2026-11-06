import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';

export default function CartItem({ product, qty }) {
  const { setQty, removeItem } = useCart();

  return (
    <div className="flex items-center space-x-4 border-b border-brand-sand pb-4">
      <img src={product.img} alt={product.nombre} className="w-16 h-16 object-cover rounded border border-stone-200" />
      <div className="flex-1">
        <h5 className="text-xs font-semibold text-stone-800">{product.nombre}</h5>
        <p className="text-xs text-stone-500 font-bold mt-1">{formatPrice(product.precio * qty)}</p>
        <div className="flex items-center mt-2 space-x-2">
          <button onClick={() => setQty(product.id, qty - 1)} aria-label="Quitar una unidad" className="w-6 h-6 border border-stone-300 flex items-center justify-center hover:bg-stone-100">
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs w-5 text-center">{qty}</span>
          <button onClick={() => setQty(product.id, qty + 1)} aria-label="Agregar una unidad" className="w-6 h-6 border border-stone-300 flex items-center justify-center hover:bg-stone-100">
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
      <button onClick={() => removeItem(product.id)} aria-label="Eliminar producto" className="text-stone-400 hover:text-red-500">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
