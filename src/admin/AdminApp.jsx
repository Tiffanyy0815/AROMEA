import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { CustomersProvider } from './CustomersContext.jsx';
import CustomersPage from './CustomersPage.jsx';

export default function AdminApp() {
  return (
    <CustomersProvider>
      <div className="min-h-screen bg-brand-beige">
        <header className="bg-brand-black text-white">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div>
              <span className="font-serif text-xl tracking-[0.2em]">AROMÉA</span>
              <span className="ml-3 text-xs tracking-widest uppercase text-stone-400">Administración</span>
            </div>
            <Link to="/" className="text-xs uppercase tracking-widest hover:text-amber-200">
              Ver tienda
            </Link>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-10">
          <Routes>
            <Route path="clientes" element={<CustomersPage />} />
            <Route path="*" element={<Navigate to="/admin/clientes" replace />} />
          </Routes>
        </main>
      </div>
    </CustomersProvider>
  );
}
