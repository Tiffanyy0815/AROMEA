import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/format.js';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="bg-white border border-brand-sand rounded-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.img}
          alt={product.nombre}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-brand-black text-white text-[10px] px-2 py-1 uppercase tracking-widest font-semibold">
          {product.marca}
        </span>
      </div>
      <div className="p-4 text-center">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">Ref: {product.ref}</p>
        <h4 className="font-serif text-base font-medium mb-2 text-stone-800">{product.nombre}</h4>
        <p className="text-sm font-bold text-brand-black mb-4">{formatPrice(product.precio)}</p>
        <button
          onClick={() => addItem(product.id)}
          className="w-full bg-brand-black text-white py-2 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
        >
          Agregar al Carrito
        </button>
      </div>
    </article>
  );
}
