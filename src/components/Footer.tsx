import React from 'react';
import { Instagram, Phone, Mail, ArrowUp, MessageCircle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function Footer() {
    const { settings } = useSettings();

    const logoSrc = settings.logo || '/logo-alpha.png';

    return (
        <footer className="relative overflow-hidden border-t border-white/5 bg-[#030303]">
            {/* Efeito de fundo premium */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 h-[1px] w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
                <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-gold/5 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 items-center">

                    {/* ESQUERDA - Marca e redes */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full border-2 border-brand-gold flex items-center justify-center text-brand-gold font-black shadow-[0_0_30px_rgba(197,160,89,0.18)]">
                                A
                            </div>

                            <div>
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                                    Alpha <span className="text-brand-gold">Store</span>
                                </h3>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mt-1">
                                    Multimarcas
                                </p>
                            </div>
                        </div>

                        <p className="max-w-xs text-sm leading-relaxed text-white/40">
                            Estilo esportivo, camisas de time e peças selecionadas para quem veste presença.
                        </p>

                        <div className="flex items-center gap-4">
                            <a
                                href={settings.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/50 hover:bg-brand-gold/10 transition-all duration-300 hover:-translate-y-1 shadow-xl"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-8 h-8 md:w-10 md:h-10" />
                            </a>

                            <a
                                href={`https://wa.me/${settings.phoneNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-brand-gold text-black border border-brand-gold flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-[0_0_35px_rgba(197,160,89,0.22)]"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />
                            </a>
                        </div>
                    </div>

                    {/* CENTRO - Logo */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-brand-gold/10 blur-3xl scale-75" />

                            <img
                                src={logoSrc}
                                alt="Logo Alpha Store"
                                className="relative w-56 md:w-72 lg:w-80 object-contain drop-shadow-[0_0_45px_rgba(197,160,89,0.18)]"
                            />
                        </div>

                        <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-brand-gold/70 font-black">
                            Padrão Alpha
                        </p>
                    </div>

                    {/* DIREITA - Contato */}
                    <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-6">
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-[0.25em] text-white">
                                Contato
                            </h4>
                            <p className="text-xs text-white/30 mt-2">
                                Fale com a Alpha Store
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={`https://wa.me/${settings.phoneNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center lg:justify-end gap-3 text-white/55 hover:text-brand-gold transition-colors"
                            >
                                <Phone className="w-4 h-4 text-brand-gold" />
                                <span>{settings.phoneNumber}</span>
                            </a>

                            <a
                                href={`mailto:${settings.email}`}
                                className="flex items-center justify-center lg:justify-end gap-3 text-white/55 hover:text-brand-gold transition-colors"
                            >
                                <Mail className="w-4 h-4 text-brand-gold" />
                                <span>{settings.email}</span>
                            </a>
                        </div>

                        <a
                            href="/admin"
                            className="text-[10px] font-black uppercase tracking-[0.25em] text-white/20 hover:text-brand-gold transition-colors pt-2"
                        >
                            Área do Administrador
                        </a>
                    </div>
                </div>

                {/* Linha inferior */}
                <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/25">
                        © 2026 Alpha Store Multimarcas.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-brand-gold transition-colors"
                    >
                        Voltar ao topo
                        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                    </button>
                </div>
            </div>
        </footer>
    );
}