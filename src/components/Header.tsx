import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function Header() {
    const { totalItems } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-50">
            {/* Faixa superior */}
            <div className="w-full bg-[#c8a25a] text-black text-center py-3 px-4">
                <p className="text-[10px] md:text-xs font-black tracking-[0.35em] uppercase">
                    Sempre com novidades!
                </p>
            </div>

            {/* Barra principal */}
            <div className="w-full px-4 md:px-8 lg:px-12 py-6">
                <div className="flex items-center justify-between gap-4">

                    {/* Logo */}
                    <div className="flex items-center min-w-[180px]">
                        <a href="/" className="flex items-center">
                            <img
                                src="/logo-alpha.png"
                                alt="Alpha Store"
                                className="h-14 md:h-20 lg:h-24 object-contain"
                            />
                        </a>
                    </div>

                    {/* Menu desktop */}
                    <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
                        <a
                            href="#inicio"
                            className="text-white/90 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                        >
                            Início
                        </a>
                        <a
                            href="#colecao"
                            className="text-white/80 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                        >
                            Coleção
                        </a>
                        <a
                            href="#lancamentos"
                            className="text-white/80 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                        >
                            Lançamentos
                        </a>
                        <a
                            href="#contato"
                            className="text-white/80 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                        >
                            Contato
                        </a>
                    </nav>

                    {/* Direita */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Busca */}
                        <div className="flex items-center gap-3 bg-black/45 border border-[#c8a25a]/50 rounded-full px-5 py-3 min-w-[260px] lg:min-w-[340px] backdrop-blur-sm">
                            <Search className="w-5 h-5 text-white/70" />
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                className="bg-transparent outline-none border-none text-white placeholder:text-white/45 w-full"
                            />
                        </div>

                        {/* Carrinho */}
                        <button className="relative text-[#c8a25a] hover:scale-105 transition-transform">
                            <ShoppingCart className="w-8 h-8" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#c8a25a] text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Botão mobile */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-white"
                    >
                        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>

                {/* Menu mobile */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-5 bg-black/90 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                        <div className="flex flex-col gap-4">
                            <a
                                href="#inicio"
                                className="text-white/90 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Início
                            </a>
                            <a
                                href="#colecao"
                                className="text-white/80 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Coleção
                            </a>
                            <a
                                href="#lancamentos"
                                className="text-white/80 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Lançamentos
                            </a>
                            <a
                                href="#contato"
                                className="text-white/80 hover:text-brand-gold transition-colors text-sm font-black uppercase tracking-[0.18em]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contato
                            </a>

                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3 mt-2">
                                <Search className="w-5 h-5 text-white/70" />
                                <input
                                    type="text"
                                    placeholder="Buscar produtos..."
                                    className="bg-transparent outline-none border-none text-white placeholder:text-white/45 w-full"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}