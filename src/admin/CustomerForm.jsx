import { useState } from 'react';
import { X } from 'lucide-react';
import { useModal } from '../hooks/useModal.js';

const inputClass = 'w-full border border-stone-300 p-2 text-sm focus:border-brand-black outline-none bg-white';
const labelClass = 'block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-1';

const EMPTY = { nombre: '', telefono: '', email: '', ciudad: '', notas: '' };

export default function CustomerForm({ customer, onSave, onClose }) {
  const [form, setForm] = useState({ ...EMPTY, ...customer });
  const [error, setError] = useState('');

  useModal(true, onClose);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError('Escribe el nombre del cliente.');
      return;
    }
    const { id, creado, ...data } = form;
    onSave({ ...data, nombre: form.nombre.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div onClick={onClose} className="fixed inset-0 bg-black/50" />

        <div className="relative bg-white max-w-md w-full p-8 shadow-xl z-10 border border-brand-sand">
          <button onClick={onClose} aria-label="Cerrar" className="absolute top-4 right-4 text-stone-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>

          <h3 className="font-serif text-2xl text-stone-900 mb-6">
            {customer ? 'Editar cliente' : 'Nuevo cliente'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="c-nombre">Nombre</label>
              <input id="c-nombre" value={form.nombre} onChange={update('nombre')} className={inputClass} autoFocus />
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>
            <div>
              <label className={labelClass} htmlFor="c-tel">Teléfono / WhatsApp</label>
              <input id="c-tel" value={form.telefono} onChange={update('telefono')} className={inputClass} placeholder="829-000-0000" />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-email">Correo</label>
              <input id="c-email" type="email" value={form.email} onChange={update('email')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-ciudad">Ciudad o dirección de entrega</label>
              <input id="c-ciudad" value={form.ciudad} onChange={update('ciudad')} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-notas">Notas</label>
              <textarea id="c-notas" rows={3} value={form.notas} onChange={update('notas')} className={inputClass} />
            </div>
            <button type="submit" className="w-full bg-brand-black text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors">
              Guardar cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
