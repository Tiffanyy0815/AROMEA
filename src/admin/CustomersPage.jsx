import { useMemo, useState } from 'react';
import { MessageCircle, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useCustomers } from './CustomersContext.jsx';
import CustomerForm from './CustomerForm.jsx';

const soloDigitos = (t) => t.replace(/\D/g, '');

export default function CustomersPage() {
  const { customers, add, update, remove } = useCustomers();
  const [query, setQuery] = useState('');
  // null = cerrado, 'new' = crear, objeto = editar
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) =>
      [c.nombre, c.telefono, c.email, c.ciudad].some((v) => v?.toLowerCase().includes(q))
    );
  }, [customers, query]);

  const handleSave = (data) => {
    if (editing === 'new') add(data);
    else update(editing.id, data);
    setEditing(null);
  };

  const handleDelete = (c) => {
    if (window.confirm(`¿Eliminar a ${c.nombre}? Esta acción no se puede deshacer.`)) remove(c.id);
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 border-b border-brand-sand pb-4">
        <div>
          <h1 className="font-serif text-3xl">Clientes</h1>
          <p className="text-xs text-stone-500 mt-1">
            {customers.length} {customers.length === 1 ? 'cliente registrado' : 'clientes registrados'}
          </p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center justify-center gap-2 bg-brand-black text-white px-5 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nuevo cliente
        </button>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, teléfono, correo o ciudad"
          aria-label="Buscar clientes"
          className="w-full border border-stone-300 bg-white pl-9 pr-3 py-2 text-sm focus:border-brand-black outline-none"
        />
      </div>

      {customers.length === 0 ? (
        <p className="text-center text-stone-500 text-sm py-16 bg-white border border-brand-sand">
          Todavía no hay clientes. Agrega el primero con el botón “Nuevo cliente”.
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-stone-500 text-sm py-16 bg-white border border-brand-sand">
          Ningún cliente coincide con “{query}”.
        </p>
      ) : (
        <div className="bg-white border border-brand-sand overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-brand-sand/40 text-xs uppercase tracking-widest text-stone-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Teléfono</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Correo</th>
                <th className="px-4 py-3 font-semibold hidden md:table-cell">Ciudad</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-brand-sand align-top">
                  <td className="px-4 py-3">
                    <p className="font-semibold">{c.nombre}</p>
                    {c.notas && <p className="text-xs text-stone-500 mt-0.5 max-w-xs truncate">{c.notas}</p>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.telefono || '—'}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{c.email || '—'}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{c.ciudad || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3 text-stone-500">
                      {c.telefono && (
                        <a
                          href={`https://wa.me/1${soloDigitos(c.telefono)}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Escribir a ${c.nombre} por WhatsApp`}
                          className="hover:text-green-700"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                      <button onClick={() => setEditing(c)} aria-label={`Editar ${c.nombre}`} className="hover:text-brand-black">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(c)} aria-label={`Eliminar ${c.nombre}`} className="hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <CustomerForm
          customer={editing === 'new' ? null : editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </section>
  );
}
