import { useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import { CATEGORIAS, formatMoney } from './adminData.js'

const TONOS = ['bg-[#FDAB8F]', 'bg-[#8FE2FD]', 'bg-[#FFD9C9]', 'bg-[#BDEBFA]']

export default function Productos({ productos, query, onNew, onEdit, onRemove, onToggle }) {
  const [categoria, setCategoria] = useState(null)

  const visibles = useMemo(
    () =>
      productos.filter(
        (p) =>
          (!categoria || p.categoria === categoria) &&
          p.nombre.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [productos, categoria, query]
  )

  return (
    <div className="space-y-10">
      <header className="flex items-center gap-3 border-b border-[#EEE7E3] pb-5">
        <h1 className="text-3xl">Productos</h1>
        <button type="button" onClick={onNew} aria-label="Nuevo producto" className="grid h-10 w-10 place-items-center rounded-xl bg-[#8FE2FD] transition hover:bg-[#74d6f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2A3B]">
          <Icon name="plus" />
        </button>
      </header>

      <section aria-label="Categorías">
        <h2 className="mb-5 text-lg">Categorías</h2>
        <div className="grid grid-cols-2 gap-4 pt-2 lg:grid-cols-4">
          {CATEGORIAS.map((c) => {
            const items = productos.filter((p) => p.categoria === c)
            const active = categoria === c
            const bg = active ? 'bg-[#FDAB8F]' : 'bg-[#F3F6F8]'
            return (
              <button
                key={c}
                type="button"
                aria-pressed={active}
                onClick={() => setCategoria(active ? null : c)}
                className={`relative flex h-36 flex-col justify-between rounded-3xl p-4 text-left transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2A3B] ${bg}`}
              >
                <span aria-hidden="true" className={`absolute -top-2 right-5 h-3 w-14 rounded-t-lg ${bg}`} />
                <div className="flex -space-x-2">
                  {items.slice(0, 4).map((p, i) => (
                    <span key={p.id} className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ring-2 ring-white ${TONOS[i % 4]}`}>
                      {p.nombre[0]}
                    </span>
                  ))}
                  {items.length === 0 && <span className="text-xs text-[#6D6877]">Sin productos</span>}
                </div>
                <div>
                  <p className="font-bold">{c}</p>
                  <p className="text-xs text-[#6D6877]">{items.length} {items.length === 1 ? 'producto' : 'productos'}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section aria-label="Todos los productos">
        <h2 className="mb-3 text-lg">{categoria ? categoria : 'Todos los productos'}</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="text-xs text-[#6D6877]">
              <tr className="border-b border-[#EEE7E3]">
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Visible</th>
                <th className="px-4 py-3"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {visibles.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-[#6D6877]">
                    No hay productos que coincidan. Prueba otra búsqueda o agrega uno nuevo.
                  </td>
                </tr>
              )}
              {visibles.map((p, i) => (
                <tr key={p.id} className="border-b border-[#EEE7E3] transition hover:bg-[#E8F8FD]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.imagen ? (
                        <img src={p.imagen} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      ) : (
                        <span className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold ${TONOS[i % 4]}`}>{p.nombre[0]}</span>
                      )}
                      <span className="font-semibold">{p.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6D6877]">{p.categoria}</td>
                  <td className="px-4 py-3">{formatMoney(p.precio)}</td>
                  <td className={`px-4 py-3 ${p.stock <= 5 ? 'font-semibold text-[#8A3B22]' : ''}`}>{p.stock}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={p.activo}
                      aria-label={`${p.activo ? 'Ocultar' : 'Mostrar'} ${p.nombre}`}
                      onClick={() => onToggle(p)}
                      className={`relative h-6 w-11 rounded-full transition ${p.activo ? 'bg-[#FDAB8F]' : 'bg-[#E4DEDB]'}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${p.activo ? 'left-[1.375rem]' : 'left-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1 text-[#6D6877]">
                      <button type="button" onClick={() => onEdit(p)} aria-label={`Editar ${p.nombre}`} className="rounded-lg p-2 hover:bg-white hover:text-[#2E2A3B]">
                        <Icon name="edit" className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => onRemove(p)} aria-label={`Eliminar ${p.nombre}`} className="rounded-lg p-2 hover:bg-[#FFE7DF] hover:text-[#8A3B22]">
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
