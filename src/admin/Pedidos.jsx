import { useState } from 'react'
import { CARD, ESTADOS, ESTADO_STYLE, formatMoney } from './adminData.js'

export default function Pedidos({ pedidos, setPedidos }) {
  const [filtro, setFiltro] = useState('Todos')
  const visibles = filtro === 'Todos' ? pedidos : pedidos.filter((p) => p.estado === filtro)

  const cambiarEstado = (id, estado) =>
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)))

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold">Pedidos</h1>
        <p className="mt-1 text-sm text-[#6D6877]">Revisa y actualiza el estado de cada pedido.</p>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {['Todos', ...ESTADOS].map((e) => (
          <button
            key={e}
            type="button"
            aria-pressed={filtro === e}
            onClick={() => setFiltro(e)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filtro === e ? 'bg-[#FDAB8F] text-[#2E2A3B]' : 'bg-white/70 text-[#6D6877] hover:bg-white'
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className={`${CARD} overflow-x-auto`}>
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="text-[#6D6877]">
            <tr>
              <th className="px-5 py-4 font-semibold">Pedido</th>
              <th className="px-5 py-4 font-semibold">Cliente</th>
              <th className="px-5 py-4 font-semibold">Fecha</th>
              <th className="px-5 py-4 font-semibold">Total</th>
              <th className="px-5 py-4 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0E9E5]">
            {visibles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-[#6D6877]">
                  No hay pedidos con el estado "{filtro}".
                </td>
              </tr>
            )}
            {visibles.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-4 font-semibold">#{p.id}</td>
                <td className="px-5 py-4">{p.cliente}</td>
                <td className="px-5 py-4 text-[#6D6877]">{p.fecha}</td>
                <td className="px-5 py-4">{formatMoney(p.total)}</td>
                <td className="px-5 py-4">
                  <select
                    value={p.estado}
                    onChange={(e) => cambiarEstado(p.id, e.target.value)}
                    aria-label={`Estado del pedido ${p.id}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#8FE2FD] ${ESTADO_STYLE[p.estado]}`}
                  >
                    {ESTADOS.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
