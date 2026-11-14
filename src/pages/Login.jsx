import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

/*
  Paleta
  - Durazno  #FDAB8F
  - Celeste  #8FE2FD
  - Tinta    #2E2A3B (texto)
  - Apagado  #6D6877 (texto secundario)
  Fuente sugerida: Plus Jakarta Sans (ver index.html en las instrucciones)
*/

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="3" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  )
}

export default function Login() {
  const { user, login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to={redirectTo} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password, remember)
      navigate(redirectTo, { replace: true })
    } catch {
      setError('Correo o contraseña incorrectos. Revisa los datos e inténtalo de nuevo.')
      setLoading(false)
    }
  }

  const fieldClass =
    'flex items-center gap-3 rounded-2xl bg-[#F7F3F1] px-4 py-3.5 text-[#6D6877] ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-[#8FE2FD]'

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF4EE] px-4 py-10"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes lg-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes lg-rise {
          from { opacity: 0; transform: translateY(28px) scale(.98) }
          to { opacity: 1; transform: none }
        }
        @keyframes lg-rise-sm {
          from { opacity: 0; transform: translateY(12px) }
          to { opacity: 1; transform: none }
        }
        @keyframes lg-float {
          from { opacity: 0; transform: translateY(40px) scale(.85) }
          to { opacity: .9; transform: none }
        }
        .lg-fade { animation: lg-fade 1.2s ease-out both }
        .lg-card { animation: lg-rise .8s cubic-bezier(.22, 1, .36, 1) both }
        .lg-sphere { animation: lg-float 1.1s cubic-bezier(.22, 1, .36, 1) .3s both }
        .lg-item {
          animation: lg-rise-sm .6s cubic-bezier(.22, 1, .36, 1) both;
          animation-delay: calc(.35s + var(--i, 0) * 80ms);
        }
        @media (prefers-reduced-motion: reduce) {
          .lg-fade, .lg-card, .lg-sphere, .lg-item { animation: none }
        }
      `}</style>

      {/* Fondo difuminado */}
      <div aria-hidden="true" className="lg-fade pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#FDAB8F]/60 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-[#8FE2FD]/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FFD9C9]/70 blur-3xl" />
      </div>

      <div className="lg-card relative z-10 flex w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white/50 shadow-[0_30px_80px_-20px_rgba(143,226,253,0.55)] ring-1 ring-white/70 backdrop-blur-xl">
        {/* Panel de bienvenida */}
        <section className="relative hidden w-[46%] shrink-0 overflow-hidden bg-gradient-to-br from-[#FDAB8F] via-[#F9C9BD] to-[#8FE2FD] p-10 text-[#2E2A3B] lg:block">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 bottom-[-4rem] h-64 w-64 rounded-full bg-white/35 blur-2xl" />
            <div className="absolute right-6 top-[-3rem] h-56 w-56 rounded-full bg-[#8FE2FD]/70 blur-2xl" />
            {/* Esfera */}
            <div className="lg-sphere absolute bottom-10 left-24 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffffff_0%,#FFDCCD_30%,#FDAB8F_75%)] opacity-90 shadow-[0_20px_40px_-10px_rgba(253,171,143,0.7)]" />
          </div>

          <div className="relative flex h-full flex-col justify-center pb-24">
            <p className="text-sm font-semibold tracking-wide">AROMEA</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight">
              Hola de nuevo
            </h1>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-[#2E2A3B]/80">
              Inicia sesión para administrar tu tienda desde un solo lugar.
            </p>
          </div>
        </section>

        {/* Formulario (se superpone con borde curvo, como en la referencia) */}
        <section className="relative w-full bg-white/90 px-6 py-10 sm:px-12 lg:-ml-14 lg:rounded-l-[4rem] lg:py-14 lg:pl-20 lg:pr-12">
          <p className="mb-6 text-sm font-semibold tracking-wide text-[#2E2A3B] lg:hidden">AROMEA</p>

          <h2 style={{ "--i": 0 }} className="lg-item text-3xl font-extrabold text-[#2E2A3B]">Iniciar sesión</h2>
          <p style={{ "--i": 1 }} className="lg-item mt-2 text-sm text-[#6D6877]">
            Accede al panel de administración.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div style={{ "--i": 2 }} className="lg-item">
              <label htmlFor="email" className="sr-only">Correo electrónico</label>
              <div className={fieldClass}>
                <MailIcon />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full bg-transparent text-sm text-[#2E2A3B] outline-none placeholder:text-[#6D6877]"
                />
              </div>
            </div>

            <div style={{ "--i": 3 }} className="lg-item">
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <div className={fieldClass}>
                <LockIcon />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full bg-transparent text-sm text-[#2E2A3B] outline-none placeholder:text-[#6D6877]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="rounded-md px-1 text-xs font-semibold text-[#2E2A3B] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8FE2FD]"
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <label style={{ "--i": 4 }} className="lg-item flex w-fit cursor-pointer items-center gap-2 text-sm text-[#6D6877]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded accent-[#FDAB8F]"
              />
              Mantener sesión iniciada
            </label>

            {error && (
              <p role="alert" className="rounded-xl bg-[#FFE7DF] px-4 py-3 text-sm text-[#8A3B22]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ "--i": 5 }}
              className="lg-item w-full rounded-2xl bg-[#FDAB8F] px-4 py-3.5 text-sm font-bold text-[#2E2A3B] shadow-[0_12px_24px_-10px_rgba(253,171,143,0.9)] transition hover:bg-[#fc9d7c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FE2FD] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Entrando…' : 'Entrar al panel'}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}