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

type AdminProfileRow = {
    id: string;
    email: string;
    role: string;
    created_at: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function fromProfile(row: AdminProfileRow): AdminCredentials {
    return {
        id: row.id,
        username: row.email,
        password: '',
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
        const loadSession = async () => {
            const { data: sessionData } = await supabase.auth.getSession();
            const session = sessionData.session;

            if (!session?.user) {
                setAuth({
                    user: null,
                    isAuthenticated: false,
                    token: null,
                });
                return;
            }

            const { data: profile, error } = await supabase
                .from('admin_profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();

            if (error || !profile) {
                await supabase.auth.signOut();
                setAuth({
                    user: null,
                    isAuthenticated: false,
                    token: null,
                });
                return;
            }

            setAuth({
                user: fromProfile(profile),
                isAuthenticated: true,
                token: session.access_token,
            });
        };

        loadSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session?.user) {
                setAuth({
                    user: null,
                    isAuthenticated: false,
                    token: null,
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password,
        });

        if (error || !data.user || !data.session) {
            console.error('Erro ao fazer login:', error);
            return false;
        }

        const { data: profile, error: profileError } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', data.user.id)
            .maybeSingle();

        if (profileError || !profile) {
            await supabase.auth.signOut();
            console.error('Usuário não possui permissão de admin');
            return false;
        }

        setAuth({
            user: fromProfile(profile),
            isAuthenticated: true,
            token: data.session.access_token,
        });

        return true;
    };

    const logout = () => {
        setAuth({
            user: null,
            isAuthenticated: false,
            token: null,
        });

        supabase.auth.signOut();
    };

    const checkAuth = () => {
        return auth.isAuthenticated;
    };

    const getAdminUsers = async (): Promise<AdminCredentials[]> => {
        const { data, error } = await supabase
            .from('admin_profiles')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Erro ao buscar administradores:', error);
            return [];
        }

        return (data || []).map(fromProfile);
    };

    const addAdminUser = async (username: string, password: string): Promise<void> => {
        throw new Error('Agora os administradores devem ser criados pelo Supabase Auth.');
    };

    const removeAdminUser = async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('admin_profiles')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao remover administrador:', error);
            throw error;
        }
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