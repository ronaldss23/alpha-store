import React, { useState, useEffect } from 'react';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function AdminLogin() {
    const { login, addAdminUser, getAdminUsers } = useAuth();
    const navigate = useNavigate();
    const [isSetup, setIsSetup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const users = getAdminUsers();
        setIsSetup(users.length === 0);
    }, [getAdminUsers]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const success = await login(username, password);
            if (success) {
                toast.success('Login realizado com sucesso!');
                navigate('/admin');
            } else {
                toast.error('Usuário ou senha incorretos.');
            }
        } catch (err) {
            toast.error('Ocorreu um erro ao tentar fazer login.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('As senhas não coincidem.');
            return;
        }

        addAdminUser(username, password);
        toast.success('Administrador configurado com sucesso!');
        setIsSetup(false);
    };

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-brand-gray border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-brand-gold rounded-2xl rotate-12 flex items-center justify-center mx-auto mb-6">
                        {isSetup ? <ShieldCheck className="w-8 h-8 text-black -rotate-12" /> : <Lock className="w-8 h-8 text-black -rotate-12" />}
                    </div>
                    <h1 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">
                        {isSetup ? 'Configurar Admin' : 'Acesso Restrito'}
                    </h1>
                    <p className="text-white/40 text-sm">
                        {isSetup ? 'Crie seu usuário e senha de acesso' : 'Entre com suas credenciais de administrador'}
                    </p>
                </div>

                <form onSubmit={isSetup ? handleRegister : handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Usuário</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                                placeholder="ex: admin"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    {isSetup && (
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1">Confirmar Senha</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                <input 
                                    type="password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-gold focus:bg-white/[0.08] transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="w-full flex items-center justify-center p-4">
                            <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-2 group py-4 disabled:opacity-50"
                        >
                            {isSetup ? 'Criar Acesso' : 'Entrar no Painel'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                    
                    <a href="/" className="block text-center text-xs text-white/20 hover:text-white transition-colors uppercase tracking-widest mt-6">
                        Voltar para a Loja
                    </a>
                </form>
            </motion.div>
        </div>
    );
}
