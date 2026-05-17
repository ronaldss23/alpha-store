import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Trash2, ShieldCheck, Mail, Key } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { AdminCredentials } from '../../types';

export function UsersTab() {
    const { getAdminUsers, addAdminUser, removeAdminUser, user: currentUser } = useAuth();

    const [users, setUsers] = useState<AdminCredentials[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const loadUsers = async () => {
        setIsLoading(true);
        const adminUsers = await getAdminUsers();
        setUsers(adminUsers);
        setIsLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newUsername || !newPassword) {
            toast.error('Preencha todos os campos');
            return;
        }

        if (users.find(u => u.username === newUsername)) {
            toast.error('Este usuário já existe');
            return;
        }

        try {
            await addAdminUser(newUsername, newPassword);
            await loadUsers();

            setNewUsername('');
            setNewPassword('');
            setIsAdding(false);

            toast.success('Novo administrador adicionado');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao adicionar administrador');
        }
    };

    const handleRemoveUser = async (id: string, username: string) => {
        if (username === currentUser?.username) {
            toast.error('Você não pode remover seu próprio usuário');
            return;
        }

        if (confirm(`Tem certeza que deseja remover o acesso de ${username}?`)) {
            try {
                await removeAdminUser(id);
                await loadUsers();
                toast.success('Usuário removido');
            } catch (error) {
                console.error(error);
                toast.error('Erro ao remover usuário');
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold uppercase tracking-tight">Gestão de Acesso</h2>
                    <p className="text-white/40 font-light mt-1 text-sm">Gerencie quem tem permissão para administrar a loja.</p>
                </div>

                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="btn-primary py-3 px-6 rounded-2xl flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                >
                    <UserPlus className="w-4 h-4" />
                    Novo Usuário
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass p-8 rounded-3xl border border-brand-gold/30"
                    >
                        <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Usuário / E-mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:border-brand-gold outline-none transition-all"
                                        placeholder="ex: admin@loja.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 block font-bold">Senha Inicial</label>
                                <div className="relative">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 focus:border-brand-gold outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button type="submit" className="flex-1 btn-primary py-4 rounded-2xl font-bold uppercase tracking-widest text-xs">
                                    Criar Acesso
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="px-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-bold uppercase tracking-widest text-xs"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="glass overflow-hidden rounded-[2rem]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Administrador</th>
                                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Nível</th>
                                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">Desde</th>
                                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold text-right">Ações</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-10 text-center text-white/40">
                                        Carregando usuários...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-10 text-center text-white/40">
                                        Nenhum administrador cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="font-bold">{u.username}</div>
                                                    {u.username === currentUser?.username && (
                                                        <span className="text-[8px] uppercase bg-white/10 px-1.5 py-0.5 rounded text-white/40">Você</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest">
                                                <ShieldCheck className="w-4 h-4" />
                                                Full Access
                                            </div>
                                        </td>

                                        <td className="px-8 py-6 text-white/30 text-sm">
                                            {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                                        </td>

                                        <td className="px-8 py-6 text-right">
                                            <button
                                                onClick={() => handleRemoveUser(u.id, u.username)}
                                                disabled={u.username === currentUser?.username}
                                                className="p-2 text-white/10 hover:text-red-500 disabled:opacity-0 transition-all rounded-lg hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}