import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useModal } from '../hooks/useModal.js';

const inputClass = 'w-full border border-stone-300 p-2 text-sm focus:border-brand-black outline-none';
const labelClass = 'block text-xs uppercase tracking-widest font-semibold text-stone-700 mb-1';

export default function AuthModal() {
  const { user, isOpen, closeAuth, login, logout } = useAuth();
  const [isRegistering, setIsRegistering] = useState(true);
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });

  useModal(isOpen, closeAuth);
  if (!isOpen) return null;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = isRegistering ? form.nombre.trim() || form.email.split('@')[0] : form.email.split('@')[0];
    login({ nombre, email: form.email });
    setForm({ nombre: '', email: '', password: '' }); // la contraseña no se guarda
    closeAuth();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div onClick={closeAuth} className="fixed inset-0 bg-black/50" />

        <div className="relative bg-white max-w-md w-full p-8 shadow-xl z-10 border border-brand-sand">
          <button onClick={closeAuth} aria-label="Cerrar" className="absolute top-4 right-4 text-stone-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>

          {user ? (
            <div className="text-center">
              <h3 className="font-serif text-2xl text-stone-900 mb-2">Hola, {user.nombre}</h3>
              <p className="text-xs text-stone-500 mb-6">{user.email}</p>
              <button
                onClick={() => { logout(); closeAuth(); }}
                className="w-full border border-brand-black py-3 text-xs uppercase tracking-widest font-semibold hover:bg-brand-black hover:text-white transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-2xl text-stone-900 mb-2">{isRegistering ? 'Crear una Cuenta' : 'Iniciar Sesión'}</h3>
              <p className="text-xs text-stone-500 mb-6">
                {isRegistering ? 'Regístrate para realizar tus pedidos en AROMÉA.' : 'Ingresa tus datos para acceder a tu cuenta.'}
              </p>

              <form onSubmit={handleSubmit}>
                {isRegistering && (
                  <div className="mb-4">
                    <label className={labelClass} htmlFor="auth-nombre">Nombre Completo</label>
                    <input id="auth-nombre" type="text" value={form.nombre} onChange={update('nombre')} className={inputClass} placeholder="Tu nombre" />
                  </div>
                )}
                <div className="mb-4">
                  <label className={labelClass} htmlFor="auth-email">Correo Electrónico</label>
                  <input id="auth-email" type="email" required value={form.email} onChange={update('email')} className={inputClass} placeholder="ejemplo@correo.com" />
                </div>
                <div className="mb-6">
                  <label className={labelClass} htmlFor="auth-pass">Contraseña</label>
                  <input id="auth-pass" type="password" required value={form.password} onChange={update('password')} className={inputClass} placeholder="••••••••" />
                </div>
                <button type="submit" className="w-full bg-brand-black text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors mb-4">
                  {isRegistering ? 'Registrar Cuenta' : 'Iniciar Sesión'}
                </button>
              </form>

              <div className="text-center">
                <button onClick={() => setIsRegistering((v) => !v)} className="text-xs text-stone-600 underline hover:text-brand-black">
                  {isRegistering ? '¿Ya tienes cuenta? Inicia sesión aquí' : '¿No tienes cuenta? Regístrate aquí'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
