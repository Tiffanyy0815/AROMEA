import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AdminAuthContext = createContext(null)
const STORAGE_KEY = 'aromea_admin_session'

// TEMPORAL: credenciales de prueba mientras no exista el backend.
// Cuando tengas la BDD, borra DEMO_USER y haz que login() llame a tu API.
const DEMO_USER = {
  email: 'admin@aromea.com',
  password: 'admin123',
  name: 'Administrador',
}

function readSession() {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(readSession)

  const login = useCallback(async (email, password, remember = false) => {
    // Simula la espera de una petición real
    await new Promise((resolve) => setTimeout(resolve, 700))

    const emailOk = email.trim().toLowerCase() === DEMO_USER.email
    if (!emailOk || password !== DEMO_USER.password) {
      throw new Error('Credenciales inválidas')
    }

    const session = { email: DEMO_USER.email, name: DEMO_USER.name }
    // "Recordarme" guarda la sesión entre cierres del navegador
    const store = remember ? localStorage : sessionStorage
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    store.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth debe usarse dentro de <AdminAuthProvider>')
  return ctx
}
