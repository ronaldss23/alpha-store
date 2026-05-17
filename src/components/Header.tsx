import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Instagram, Facebook, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSettings } from '../contexts/SettingsContext';

interface HeaderProps {
    cartCount: number;
    onToggleCart: () => void;
    onSearch: (term: string) => void;
}

export function Header({ cartCount, onToggleCart, onSearch }: HeaderProps) {
    const { settings } = useSettings();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const shopName = settings.name.split(' ');
    const firstName = shopName[0];
    const lastName = shopName.slice(1).join(' ');

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            {settings.showAnnouncement && settings.announcementText && (
                <div className="bg-brand-gold text-black py-2 px-4 text-center text-[10px] font-black uppercase tracking-[0.3em] h-10 flex items-center justify-center">
                    {settings.announcementText}
                </div>
            )}
            
            <div 
                className={`transition-all duration-300 w-full ${
                    isScrolled ? 'bg-brand-black/80 backdrop-blur-lg py-4 border-b border-white/10' : 'bg-transparent py-6'
                }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="lg:hidden text-white hover:text-brand-gold transition-colors"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Abrir menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        {settings.logo ? (
                            <img src={settings.logo} alt={settings.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <div className="relative flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full border-2 border-brand-gold flex items-center justify-center p-1">
                                    <div className="w-full h-full rounded-full border border-brand-gold/30 flex items-center justify-center relative">
                                        <Crown className="absolute -top-2 w-4 h-4 text-brand-gold fill-brand-gold" />
                                        <span className="text-white font-display font-bold text-lg leading-none mt-1">{firstName[0]}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col -space-y-1">
                            <span className="font-display font-bold text-xl md:text-2xl tracking-tight uppercase">
                                {firstName} <span className="text-brand-gold">{lastName}</span>
                            </span>
                        </div>
                    </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    <a href="#" className="text-[10px] font-bold hover:text-brand-gold transition-colors uppercase tracking-[0.2em] text-white/60">Início</a>
                    <a href="#colecao" className="text-[10px] font-bold hover:text-brand-gold transition-colors uppercase tracking-[0.2em] text-white/60">Coleção</a>
                    <a href="#lancamentos" className="text-[10px] font-bold hover:text-brand-gold transition-colors uppercase tracking-[0.2em] text-white/60">Lançamentos</a>
                    <a href="#contato" className="text-[10px] font-bold hover:text-brand-gold transition-colors uppercase tracking-[0.2em] text-white/60">Contato</a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            value={searchTerm}
                            onChange={handleSearch}
                            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-gold transition-all w-32 focus:w-48 xl:focus:w-64"
                        />
                    </div>
                    <button 
                        onClick={onToggleCart}
                        className="relative p-2 text-white hover:text-brand-gold transition-colors"
                        aria-label={`Ver carrinho (${cartCount} itens)`}
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand-gold text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
          </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-brand-black z-[70] p-8 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="font-display font-bold text-2xl uppercase">Menu</span>
                                <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Fechar menu">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                <a href="#" className="text-2xl font-bold hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Início</a>
                                <a href="#colecao" className="text-2xl font-bold hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Coleção</a>
                                <a href="#lancamentos" className="text-2xl font-bold hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Lançamentos</a>
                                <a href="#contato" className="text-2xl font-bold hover:text-brand-gold transition-colors" onClick={() => setIsMenuOpen(false)}>Contato</a>
                            </div>

                            <div className="mt-12 md:hidden">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar..." 
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        className="bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm w-full outline-none focus:border-brand-gold"
                                    />
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-8 right-8 flex justify-center gap-6">
                                <Instagram className="w-6 h-6 text-white/40 hover:text-brand-gold cursor-pointer" />
                                <Facebook className="w-6 h-6 text-white/40 hover:text-brand-gold cursor-pointer" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
