import { Instagram, Phone, Mail, ArrowUp } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function Footer() {
    const { settings } = useSettings();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const shopName = settings.name.split(' ');
    const firstName = shopName[0];
    const lastName = shopName.slice(1).join(' ');

    return (
        <footer className="bg-brand-gray/50 border-t border-white/5 pt-20 pb-10" id="contato">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    {/* Brand & Social */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            {settings.logo ? (
                                <img src={settings.logo} alt={settings.name} className="w-8 h-8 object-contain" />
                            ) : (
                                <div className="w-8 h-8 rounded-full border-2 border-brand-gold flex items-center justify-center">
                                    <span className="text-white font-display font-bold text-sm">{firstName[0]}</span>
                                </div>
                            )}
                            <span className="font-display font-bold text-2xl tracking-tighter uppercase">
                                {firstName} <span className="text-brand-gold">{lastName}</span>
                            </span>
                        </div>
                        <div className="flex gap-4">
                            {settings.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-black transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Contact Info ONLY */}
                    <div className="space-y-6">
                        <h4 className="font-display font-bold uppercase tracking-widest text-sm mb-4">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-white/40 text-sm">
                                <Phone className="w-4 h-4 text-brand-gold" />
                                {settings.phoneNumber}
                            </li>
                            {settings.email && (
                                <li className="flex items-center gap-3 text-white/40 text-sm">
                                    <Mail className="w-4 h-4 text-brand-gold" />
                                    {settings.email}
                                </li>
                            )}
                            <li className="pt-2">
                                <a href="/admin/login" className="text-[10px] text-white/10 hover:text-brand-gold transition-colors uppercase tracking-[0.2em] font-bold">
                                    Área do Administrador
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
                        © {new Date().getFullYear()} {settings.name.toUpperCase()}.
                    </p>
                    <button 
                        onClick={scrollToTop}
                        className="flex items-center gap-2 group text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                        Voltar ao topo
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
