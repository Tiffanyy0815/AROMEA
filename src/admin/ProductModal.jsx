import { useEffect, useState } from 'react'
import { BTN, CATEGORIAS, INPUT } from './adminData.js'

const VACIO = { nombre: '', categoria: CATEGORIAS[0], precio: '', stock: '', descripcion: '', imagen: '', activo: true }

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-[#8A3B22]">{error}</p>}
    </div>
  )
}

export default function ProductModal({ producto, onSave, onClose }) {
  const [form, setForm] = useState(producto ?? VACIO)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.nombre.trim()) next.nombre = 'Escribe el nombre del producto.'
    if (form.precio === '' || Number(form.precio) < 0) next.precio = 'Indica un precio válido.'
    if (form.stock === '' || Number(form.stock) < 0) next.stock = 'Indica las unidades disponibles.'
    setErrors(next)
    if (Object.keys(next).length) return
    onSave({ ...form, nombre: form.nombre.trim(), precio: Number(form.precio), stock: Number(form.stock) })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2E2A3B]/30 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="producto-titulo"
        onSubmit={submit}
        noValidate
        className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-20px_rgba(143,226,253,0.8)] sm:p-8"
      >
        <h2 id="producto-titulo" className="text-2xl font-extrabold">
          {producto ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        <Field label="Nombre" htmlFor="p-nombre" error={errors.nombre}>
          <input id="p-nombre" autoFocus value={form.nombre} onChange={set('nombre')} placeholder="Ej. Vela Aromática Alba" className={INPUT} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Categoría" htmlFor="p-cat">
            <select id="p-cat" value={form.categoria} onChange={set('categoria')} className={INPUT}>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Precio (RD$)" htmlFor="p-precio" error={errors.precio}>
            <input id="p-precio" type="number" min="0" step="0.01" value={form.precio} onChange={set('precio')} className={INPUT} />
          </Field>
        </div>

        <Field label="Unidades en stock" htmlFor="p-stock" error={errors.stock}>
          <input id="p-stock" type="number" min="0" step="1" value={form.stock} onChange={set('stock')} className={INPUT} />
        </Field>

        <Field label="Descripción" htmlFor="p-desc">
          <textarea id="p-desc" rows={3} value={form.descripcion} onChange={set('descripcion')} className={INPUT} />
        </Field>

        <Field label="Imagen (enlace)" htmlFor="p-img">
          <input id="p-img" type="url" value={form.imagen} onChange={set('imagen')} placeholder="https://…" className={INPUT} />
        </Field>

        <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-[#6D6877]">
          <input type="checkbox" checked={form.activo} onChange={set('activo')} className="h-4 w-4 rounded accent-[#FDAB8F]" />
          Visible en la tienda
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-2xl px-5 py-3 text-sm font-semibold text-[#6D6877] hover:bg-[#F7F3F1]">
            Cancelar
          </button>
          <button type="submit" className={BTN}>
            {producto ? 'Guardar cambios' : 'Agregar producto'}
          </button>
        </div>
      </form>
    </div>
  )
}
