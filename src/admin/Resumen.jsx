import { Link } from 'react-router-dom'
import { BTN, ESTADO_DOT, formatMoney } from './adminData.js'

export default function Resumen({ productos, pedidos, onNew }) {
  const ventas = pedidos.filter((p) => p.estado !== 'Cancelado').reduce((s, p) => s + p.total, 0)
  const pendientes = pedidos.filter((p) => p.estado === 'Pendiente').length
  const activos = productos.filter((p) => p.activo).length
  const bajoStock = productos.filter((p) => p.stock <= 5)
  const fecha = new Date().toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#EADFD9] pb-6">
        <div>
          <h1 className="text-3xl">Resumen</h1>
          <p className="mt-1 text-sm text-[#6D6877] first-letter:uppercase">{fecha}</p>
        </div>
        <button type="button" onClick={onNew} className={BTN}>
          Nuevo producto
        </button>
      </header>

      <section className="grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr] lg:items-end" aria-label="Métricas">
        <div>
          <p className="text-sm text-[#6D6877]">Ventas</p>
          <p className="adm-display mt-1 text-5xl font-bold leading-none sm:text-6xl">{formatMoney(ventas)}</p>
        </div>
        <dl className="divide-y divide-[#EADFD9] border-y border-[#EADFD9] text-sm">
          {[
            ['Pedidos pendientes', pendientes],
            ['Productos activos', activos],
            ['Con poco stock', bajoStock.length],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between py-3">
              <dt className="text-[#6D6877]">{k}</dt>
              <dd className="text-lg font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg">Pedidos recientes</h2>
            <Link to="/admin/pedidos" className="text-sm font-semibold underline underline-offset-4">Ver todos</Link>
          </div>
          <ul className="divide-y divide-[#EADFD9] border-y border-[#EADFD9]">
            {pedidos.slice(0, 4).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="font-semibold">{p.cliente}</p>
                  <p className="text-xs text-[#6D6877]">#{p.id}, {p.fecha}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{formatMoney(p.total)}</span>
                  <span className="flex w-24 items-center gap-2 text-xs text-[#6D6877]">
                    <span className={`h-2 w-2 rounded-full ${ESTADO_DOT[p.estado]}`} />
                    {p.estado}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg">Stock bajo</h2>
          {bajoStock.length === 0 ? (
            <p className="text-sm text-[#6D6877]">Todo tiene stock suficiente.</p>
          ) : (
            <ul className="divide-y divide-[#EADFD9] border-y border-[#EADFD9]">
              {bajoStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <span className="font-semibold">{p.nombre}</span>
                  <span className="text-[#8A3B22]">{p.stock} uds</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
