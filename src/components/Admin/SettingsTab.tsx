import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Save, Globe, MessageSquare, Palette, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export function SettingsTab() {
    const { settings, updateSettings } = useSettings();
    const [formData, setFormData] = useState(settings);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formData);
        toast.success('Configurações salvas com sucesso!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Informações Básicas */}
                <div className="glass p-8 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
                            <Globe className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight">Identidade da Loja</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Nome da Loja</label>
                            <input 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="Ex: Alpha Store"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">URL do Logo (opcional)</label>
                            <input 
                                type="text" 
                                value={formData.logo || ''}
                                onChange={(e) => setFormData({...formData, logo: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Cor Principal</label>
                            <div className="flex gap-4 items-center">
                                <input 
                                    type="color" 
                                    value={formData.primaryColor}
                                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                    className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer"
                                />
                                <input 
                                    type="text" 
                                    value={formData.primaryColor}
                                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all text-sm font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contato e Redes */}
                <div className="glass p-8 rounded-3xl space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight">Canais de Atendimento</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">WhatsApp (com DDD)</label>
                            <input 
                                type="text" 
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="5511999999999"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Instagram (Link completo)</label>
                            <input 
                                type="text" 
                                value={formData.instagram}
                                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="https://instagram.com/sualoja"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Facebook (Link completo)</label>
                            <input 
                                type="text" 
                                value={formData.facebook}
                                onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="https://facebook.com/sualoja"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">E-mail</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="contato@sualoja.com"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Mensagem Automática WhatsApp</label>
                            <textarea 
                                value={formData.welcomeMessage}
                                onChange={(e) => setFormData({...formData, welcomeMessage: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all h-24 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Banner e Hero */}
                <div className="glass p-8 rounded-3xl space-y-6 md:col-span-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-brand-gold/10 rounded-lg text-brand-gold">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight">Banner e Textos Hero</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">URL do Banner Principal</label>
                            <input 
                                type="text" 
                                value={formData.heroBanner || ''}
                                onChange={(e) => setFormData({...formData, heroBanner: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                                placeholder="https://..."
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Título Principal</label>
                            <input 
                                type="text" 
                                value={formData.heroTitle}
                                onChange={(e) => setFormData({...formData, heroTitle: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Tagline (Texto acima do título)</label>
                            <input 
                                type="text" 
                                value={formData.heroTagline}
                                onChange={(e) => setFormData({...formData, heroTagline: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Descrição (Hero)</label>
                            <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all h-24 resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Texto de Anúncio (Topo)</label>
                            <input 
                                type="text" 
                                value={formData.announcementText}
                                onChange={(e) => setFormData({...formData, announcementText: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all flex-grow">
                                <input 
                                    type="checkbox" 
                                    checked={formData.showAnnouncement}
                                    onChange={(e) => setFormData({...formData, showAnnouncement: e.target.checked})}
                                    className="w-5 h-5 accent-brand-gold"
                                />
                                <span className="text-sm font-medium">Exibir anúncio no topo</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 pb-12">
                <button 
                    type="submit"
                    className="btn-primary px-12 py-5 text-lg flex items-center gap-3 shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95 transition-all"
                >
                    <Save className="w-6 h-6" />
                    Salvar Todas as Alterações
                </button>
            </div>
        </form>
    );
}
