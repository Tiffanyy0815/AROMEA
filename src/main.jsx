import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import AdminApp from './admin/AdminApp.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminApp />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<App />} />
            </Routes>
          </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);