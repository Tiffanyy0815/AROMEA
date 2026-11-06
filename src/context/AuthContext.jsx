import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);

// Nota: es un registro simulado (solo guarda nombre y correo en el navegador).
// Nunca guardes contraseñas en localStorage; para algo real usa un backend.
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('aromea_user', null);
  const [isOpen, setIsOpen] = useState(false);

  const openAuth = useCallback(() => setIsOpen(true), []);
  const closeAuth = useCallback(() => setIsOpen(false), []);
  const login = useCallback(({ nombre, email }) => setUser({ nombre, email }), [setUser]);
  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, isOpen, openAuth, closeAuth, login, logout }),
    [user, isOpen, openAuth, closeAuth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
