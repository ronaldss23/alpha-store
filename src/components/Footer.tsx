import React from 'react';
import { Instagram, Phone, Mail, ArrowUp } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function Footer() {
    const { settings } = useSettings();

    const logoSrc = settings.logo || '/logo-alpha.png';

    return (
        <footer className="border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

                    {/* ESQUERDA */}
                    <div className="flex flex-col items-start gap-5">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full border-2 border-brand-gold flex items-center justify-center text-brand-gold font-black">
                                A
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tight text-brand-gold">
                                Alpha Store
                            </h3>
                        </div>

                        <a
                            href={settings.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-brand-gold hover:border-brand-gold/40 hover:bg-white/10 transition-all"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-8 h-8" />
                        </a>
                    </div>

                    {/* MEIO - LOGO */}
                    <div className="flex items-center justify-center">
                        <img
                            src={logoSrc}
                            alt="Logo Alpha Store"
                            className="w-44 md:w-56 lg:w-64 object-contain"
                        />
                    </div>

                    {/* DIREITA */}
                    <div className="flex flex-col items-start md:items-end gap-4">
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                            Contato
                        </h4>

                        <a
                            href={`https://wa.me/${settings.phoneNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors"
                        >
                            <Phone className="w-4 h-4" />
                            <span>{settings.phoneNumber}</span>
                        </a>

                        <a
                            href={`mailto:${settings.email}`}
                            className="flex items-center gap-3 text-white/60 hover:text-brand-gold transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            <span>{settings.email}</span>
                        </a>

                        <a
                            href="/admin"
                            className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-brand-gold transition-colors pt-2"
                        >
                            Área do Administrador
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-5">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/25">
                        © 2026 Alpha Store.
                    </p>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-brand-gold transition-colors"
                    >
                        Voltar ao topo
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}