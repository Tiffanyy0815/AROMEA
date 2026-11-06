import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { PRODUCTS } from '../data/products.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Guardamos solo { id, qty }; el precio siempre se toma del catálogo.
  const [stored, setStored] = useLocalStorage('aromea_cart', []);
  const [isOpen, setIsOpen] = useState(false);

  const lines = useMemo(
    () =>
      stored
        .map(({ id, qty }) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
        .filter((l) => l.product),
    [stored]
  );

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.product.precio * l.qty, 0);

  const addItem = useCallback(
    (id) => {
      setStored((prev) =>
        prev.some((i) => i.id === id)
          ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
          : [...prev, { id, qty: 1 }]
      );
      setIsOpen(true);
    },
    [setStored]
  );

  const setQty = useCallback(
    (id, qty) =>
      setStored((prev) =>
        qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
      ),
    [setStored]
  );

  const removeItem = useCallback((id) => setStored((prev) => prev.filter((i) => i.id !== id)), [setStored]);
  const clear = useCallback(() => setStored([]), [setStored]);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ lines, count, total, isOpen, addItem, setQty, removeItem, clear, openCart, closeCart }),
    [lines, count, total, isOpen, addItem, setQty, removeItem, clear, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
