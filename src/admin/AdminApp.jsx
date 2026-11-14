import { useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext.jsx'
import { PEDIDOS_INICIALES, PRODUCTOS_INICIALES } from './adminData.js'
import Icon from './Icon.jsx'
import ProductModal from './ProductModal.jsx'
import Resumen from './Resumen.jsx'
import Productos from './Productos.jsx'
import Pedidos from './Pedidos.jsx'

const NAV = [
  { to: '/admin', label: 'Productos', icon: 'box', end: true },
  { to: '/admin/resumen', label: 'Resumen', icon: 'chart' },
  { to: '/admin/pedidos', label: 'Pedidos', icon: 'bag' },
]

function Bar({ label, value, total }) {
  return (
    <div>
      <p className="text-xs">{label}: {value} de {total}</p>
      <div className="mt-1.5 h-1.5 rounded-full bg-white/40">
        <div className="h-full rounded-full bg-white" style={{ width: `${(value / total) * 100}%` }} />
      </div>
    </div>
  )
}

export default function AdminApp() {
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES)
  const [pedidos, setPedidos] = useState(PEDIDOS_INICIALES)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')

  const save = (p) => {
    setProductos((prev) =>
      p.id ? prev.map((x) => (x.id === p.id ? p : x)) : [{ ...p, id: Date.now() }, ...prev]
    )
    setEditing(null)
  }
  const remove = (p) => {
    if (window.confirm(`¿Eliminar "${p.nombre}"? Esta acción no se puede deshacer.`)) {
      setProductos((prev) => prev.filter((x) => x.id !== p.id))
    }
  }
  const toggle = (p) => setProductos((prev) => prev.map((x) => (x.id === p.id ? { ...x, activo: !x.activo } : x)))
  const onSearch = (e) => {
    setQuery(e.target.value)
    if (pathname !== '/admin') navigate('/admin')
  }

  const total = productos.length || 1
  const pendientes = pedidos.filter((p) => p.estado === 'Pendiente').length
  const inicial = (user?.name || user?.email || 'A')[0].toUpperCase()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2E2A3B] ${
      isActive ? 'bg-white/50 font-semibold' : 'hover:bg-white/25'
    }`

  return (
    <div
      className="adm relative min-h-screen overflow-hidden bg-[#8FE2FD] p-3 text-[#2E2A3B] sm:p-6 lg:p-8"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <style>{`
        .adm h1, .adm h2, .adm-display { font-family: 'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, sans-serif; font-weight: 700; letter-spacing: -0.02em }
      `}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -bottom-32 -right-24 h-[34rem] w-[34rem] rounded-full bg-[#FDAB8F]/70 blur-3xl" />
        <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-white/50 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-30px_rgba(46,42,59,0.45)] lg:h-[calc(100vh-4rem)] lg:rounded-[2.5rem]">
        <header className="flex items-center gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5">
          <p className="adm-display text-2xl lg:w-52">AROMEA</p>
          <label className="flex max-w-md flex-1 items-center gap-2 rounded-full bg-[#F3F6F8] px-4 py-2.5 text-[#6D6877] focus-within:ring-2 focus-within:ring-[#8FE2FD]">
            <Icon name="search" className="h-4 w-4 shrink-0" />
            <span className="sr-only">Buscar productos</span>
            <input
              type="search"
              value={query}
              onChange={onSearch}
              placeholder="Buscar productos"
              className="w-full bg-transparent text-sm text-[#2E2A3B] outline-none placeholder:text-[#6D6877]"
            />
          </label>
          <div className="ml-auto flex items-center gap-2 sm:gap-4">
            <Link to="/admin/pedidos" aria-label={`${pendientes} pedidos pendientes`} className="relative rounded-full p-2 text-[#6D6877] hover:bg-[#F3F6F8]">
              <Icon name="bell" />
              {pendientes > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#FDAB8F] px-1 text-[10px] font-bold">{pendientes}</span>
              )}
            </Link>
            <span className="hidden text-sm text-[#6D6877] sm:block">{user?.name || 'Administrador'}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#8FE2FD] text-sm font-bold">{inicial}</span>
            <button type="button" onClick={logout} className="text-sm text-[#6D6877] underline underline-offset-4 hover:text-[#2E2A3B]">
              Salir
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <aside className="flex flex-col gap-4 bg-[#FDAB8F] p-4 lg:w-64 lg:shrink-0 lg:gap-8 lg:rounded-tr-[4.5rem] lg:p-6">
            <button type="button" onClick={() => setEditing('new')} className="rounded-full bg-white px-5 py-3 text-sm font-bold transition hover:bg-[#FFF4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2A3B]">
              Nuevo producto
            </button>
            <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Administración">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>
                  <Icon name={n.icon} />
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto hidden space-y-4 lg:block">
              <p className="border-b border-white/50 pb-2 text-xs font-semibold">Inventario</p>
              <Bar label="Visibles en la tienda" value={productos.filter((p) => p.activo).length} total={total} />
              <Bar label="Con stock saludable" value={productos.filter((p) => p.stock > 5).length} total={total} />
              <Link to="/" className="flex items-center gap-1 pt-2 text-sm font-semibold">
                Ver tienda <Icon name="out" className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          <main className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
            <Routes>
              <Route index element={<Productos productos={productos} query={query} onNew={() => setEditing('new')} onEdit={setEditing} onRemove={remove} onToggle={toggle} />} />
              <Route path="resumen" element={<Resumen productos={productos} pedidos={pedidos} onNew={() => setEditing('new')} />} />
              <Route path="pedidos" element={<Pedidos pedidos={pedidos} setPedidos={setPedidos} />} />
              <Route path="*" element={<p className="text-sm text-[#6D6877]">Esta sección no existe.</p>} />
            </Routes>
          </main>
        </div>
      </div>

      {editing && (
        <ProductModal
          key={editing === 'new' ? 'new' : editing.id}
          producto={editing === 'new' ? null : editing}
          onSave={save}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
