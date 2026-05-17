/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

// Providers
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Pages
import { Shop } from './pages/Shop';
import { AdminLogin } from './components/Admin/Login';
import { AdminDashboard } from './components/Admin/Dashboard';

// Components
import { ProtectedRoute } from './components/Admin/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <SettingsProvider>
          <AuthProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Shop />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  
                  <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Route>

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
              <Toaster 
                position="bottom-center"
                toastOptions={{
                  style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1rem',
                    fontSize: '0.875rem',
                  }
                }}
              />
            </CartProvider>
          </AuthProvider>
        </SettingsProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

