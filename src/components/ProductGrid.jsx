import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ title, products }) {
  return (
    <section id="productos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-brand-sand pb-4">
        <h3 className="font-serif text-2xl font-normal uppercase tracking-wider">{title}</h3>
        <p className="text-xs text-stone-500 mt-1">Selección de productos en República Dominicana (RD$)</p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-stone-500 text-sm py-16">
          Pronto tendremos productos en esta categoría. Escríbenos por WhatsApp si buscas algo en especial.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
