export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <nav aria-label="Categorías" className="border-b border-brand-sand py-3 bg-white/50 overflow-x-auto">
      <div className="flex w-max mx-auto px-4 space-x-8 text-xs tracking-widest uppercase font-medium">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            aria-current={active === c.id ? 'true' : undefined}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              active === c.id
                ? 'border-brand-accent font-bold text-amber-800'
                : 'border-transparent hover:text-brand-accent'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
