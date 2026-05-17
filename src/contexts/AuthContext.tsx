import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, AdminCredentials } from '../types';

interface AuthContextType extends AuthState {
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuth: () => boolean;
    getAdminUsers: () => AdminCredentials[];
    addAdminUser: (username: string, password: string) => void;
    removeAdminUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        token: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('alpha_store_admin_token');
        const userStr = localStorage.getItem('alpha_store_admin_user');
        
        if (token && userStr) {
            try {
                setAuth({
                    user: JSON.parse(userStr),
                    isAuthenticated: true,
                    token,
                });
            } catch (e) {
                logout();
            }
        }
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Obter lista de usuários (simulando backend)
        const storedUsers = localStorage.getItem('alpha_store_admin_users');
        
        let users: AdminCredentials[] = [];
        if (storedUsers) {
            users = JSON.parse(storedUsers);
        } else {
            // Migrar credenciais antigas se existirem
            const oldCreds = localStorage.getItem('alpha_store_admin_creds');
            if (oldCreds) {
                const { user: savedUser, pass: savedPass } = JSON.parse(oldCreds);
                const initialUser: AdminCredentials = {
                    id: '1',
                    username: savedUser,
                    password: savedPass,
                    role: 'admin',
                    createdAt: new Date().toISOString()
                };
                users = [initialUser];
                localStorage.setItem('alpha_store_admin_users', JSON.stringify(users));
                localStorage.removeItem('alpha_store_admin_creds');
            }
        }

        const foundUser = users.find(u => u.username === username && u.password === password);
        
        if (foundUser) {
            const token = btoa(`${username}:${Date.now()}`); // Mock token
            const { password: _, ...userWithoutPass } = foundUser;
            
            setAuth({
                user: userWithoutPass,
                isAuthenticated: true,
                token,
            });
            
            localStorage.setItem('alpha_store_admin_token', token);
            localStorage.setItem('alpha_store_admin_user', JSON.stringify(userWithoutPass));
            return true;
        }
        return false;
    };

    const getAdminUsers = (): AdminCredentials[] => {
        const stored = localStorage.getItem('alpha_store_admin_users');
        return stored ? JSON.parse(stored) : [];
    };

    const addAdminUser = (username: string, password: string) => {
        const users = getAdminUsers();
        const newUser: AdminCredentials = {
            id: Date.now().toString(),
            username,
            password,
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        const updatedUsers = [...users, newUser];
        localStorage.setItem('alpha_store_admin_users', JSON.stringify(updatedUsers));
    };

    const removeAdminUser = (id: string) => {
        const users = getAdminUsers();
        // Não permitir remover o único usuário se for o próprio? 
        // Simplificando: apenas remove
        const updatedUsers = users.filter(u => u.id !== id);
        localStorage.setItem('alpha_store_admin_users', JSON.stringify(updatedUsers));
    };

    const logout = () => {
        setAuth({
            user: null,
            isAuthenticated: false,
            token: null,
        });
        localStorage.removeItem('alpha_store_admin_token');
        localStorage.removeItem('alpha_store_admin_user');
    };

    const checkAuth = () => {
        const token = localStorage.getItem('alpha_store_admin_token');
        if (!token) return false;
        
        return auth.isAuthenticated;
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout, checkAuth, getAdminUsers, addAdminUser, removeAdminUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
