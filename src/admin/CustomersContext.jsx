import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const CustomersContext = createContext(null);

// Por ahora los clientes se guardan en este navegador (localStorage).
// Cuando haya backend, solo hay que cambiar el cuerpo de add/update/remove.
export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useLocalStorage('aromea_customers', []);

  const add = useCallback(
    (data) =>
      setCustomers((prev) => [
        { ...data, id: crypto.randomUUID(), creado: new Date().toISOString() },
        ...prev,
      ]),
    [setCustomers]
  );

  const update = useCallback(
    (id, data) => setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c))),
    [setCustomers]
  );

  const remove = useCallback(
    (id) => setCustomers((prev) => prev.filter((c) => c.id !== id)),
    [setCustomers]
  );

  const value = useMemo(() => ({ customers, add, update, remove }), [customers, add, update, remove]);

  return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>;
}

export const useCustomers = () => useContext(CustomersContext);
