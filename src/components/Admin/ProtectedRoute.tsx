import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function ProtectedRoute() {
    const { isAuthenticated, checkAuth } = useAuth();

    if (!isAuthenticated && !checkAuth()) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}
