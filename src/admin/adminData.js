// Datos de ejemplo en memoria. Cuando tengas la BDD, reemplázalos por llamadas a tu API.
export const CATEGORIAS = ['Fragancias', 'Cuidado facial', 'Cuerpo', 'Hogar']

export const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Eau de Parfum Aurora', categoria: 'Fragancias', precio: 2450, stock: 18, descripcion: 'Notas de durazno y vainilla.', imagen: '', activo: true },
  { id: 2, nombre: 'Sérum Hidratante', categoria: 'Cuidado facial', precio: 1290, stock: 4, descripcion: 'Con ácido hialurónico.', imagen: '', activo: true },
  { id: 3, nombre: 'Crema Corporal Brisa', categoria: 'Cuerpo', precio: 890, stock: 32, descripcion: 'Textura ligera, aroma fresco.', imagen: '', activo: true },
  { id: 4, nombre: 'Vela Aromática Alba', categoria: 'Hogar', precio: 750, stock: 2, descripcion: 'Cera de soya, 40 horas.', imagen: '', activo: true },
  { id: 5, nombre: 'Difusor de Ambiente', categoria: 'Hogar', precio: 1150, stock: 11, descripcion: 'Varillas de ratán.', imagen: '', activo: false },
]

export const PEDIDOS_INICIALES = [
  { id: 1042, cliente: 'María Pérez', fecha: '2026-11-13', total: 3340, estado: 'Pendiente' },
  { id: 1041, cliente: 'Luis Gómez', fecha: '2026-11-12', total: 1290, estado: 'Enviado' },
  { id: 1040, cliente: 'Ana Rodríguez', fecha: '2026-11-11', total: 2450, estado: 'Entregado' },
  { id: 1039, cliente: 'Carlos Díaz', fecha: '2026-11-09', total: 750, estado: 'Cancelado' },
  { id: 1038, cliente: 'Sofía Martínez', fecha: '2026-11-08', total: 1780, estado: 'Entregado' },
]

export const ESTADOS = ['Pendiente', 'Enviado', 'Entregado', 'Cancelado']

export const ESTADO_STYLE = {
  Pendiente: 'bg-[#FFE7DF] text-[#8A3B22]',
  Enviado: 'bg-[#DDF5FD] text-[#14566E]',
  Entregado: 'bg-[#E3F6E8] text-[#1F5A33]',
  Cancelado: 'bg-[#EEEBEF] text-[#6D6877]',
}

const money = new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' })
export const formatMoney = (n) => money.format(n)

export const ESTADO_DOT = {
  Pendiente: 'bg-[#FDAB8F]',
  Enviado: 'bg-[#8FE2FD]',
  Entregado: 'bg-[#6DBE8A]',
  Cancelado: 'bg-[#B9B3BD]',
}

// Clases compartidas: planas, con líneas finas en vez de tarjetas
export const CARD = 'border-y border-[#EADFD9]'
export const BTN =
  'inline-block rounded-lg bg-[#FDAB8F] px-5 py-2.5 text-sm font-semibold text-[#2E2A3B] transition hover:bg-[#fb9a76] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2A3B]'
export const INPUT =
  'w-full rounded-lg border border-[#E6DAD3] bg-white px-3.5 py-2.5 text-sm text-[#2E2A3B] outline-none transition placeholder:text-[#8A8590] focus:border-[#8FE2FD] focus:ring-2 focus:ring-[#8FE2FD]/50'