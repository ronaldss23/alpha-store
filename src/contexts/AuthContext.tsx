import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, AdminCredentials } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType extends AuthState {
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuth: () => boolean;
    getAdminUsers: () => Promise<AdminCredentials[]>;
    addAdminUser: (username: string, password: string) => Promise<void>;
    removeAdminUser: (id: string) => Promise<void>;
}

type AdminUserRow = {
    id: string;
    username: string;
    password: string;
    role: string;
    created_at: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function fromSupabase(row: AdminUserRow): AdminCredentials {
    return {
        id: row.id,
        username: row.username,
        password: row.password,
        role: row.role,
        createdAt: row.created_at,
    };
}

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
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .maybeSingle();

        if (error) {
            console.error('Erro ao fazer login admin:', error);
            return false;
        }

        if (!data) {
            return false;
        }

        const foundUser = fromSupabase(data);
        const token = btoa(`${username}:${Date.now()}`);
        const { password: _, ...userWithoutPass } = foundUser;

        setAuth({
            user: userWithoutPass,
            isAuthenticated: true,
            token,
        });

        localStorage.setItem('alpha_store_admin_token', token);
        localStorage.setItem('alpha_store_admin_user', JSON.stringify(userWithoutPass));

        return true;
    };

    const getAdminUsers = async (): Promise<AdminCredentials[]> => {
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Erro ao buscar admins:', error);
            return [];
        }

        return (data || []).map(fromSupabase);
    };

    const addAdminUser = async (username: string, password: string): Promise<void> => {
        const { error } = await supabase
            .from('admin_users')
            .insert({
                username,
                password,
                role: 'admin',
            });

        if (error) {
            console.error('Erro ao adicionar admin:', error);
            throw error;
        }
    };

    const removeAdminUser = async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('admin_users')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao remover admin:', error);
            throw error;
        }
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

        if (!token) {
            return false;
        }

        return auth.isAuthenticated;
    };

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                login,
                logout,
                checkAuth,
                getAdminUsers,
                addAdminUser,
                removeAdminUser,
            }}
        >
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