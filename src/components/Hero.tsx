import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function Hero() {
    const { settings } = useSettings();

    return (
        <section className="relative h-screen flex items-center overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 text-center">
                <img 
                    src={settings.heroBanner || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop"} 
                    alt="Hero Background" 
                    className="w-full h-full object-cover opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black to-transparent" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {settings.heroTagline && (
                            <span className="inline-block px-4 py-1.5 bg-brand-gold text-black text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-sm">
                                {settings.heroTagline}
                            </span>
                        )}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.9] mb-8">
                            {settings.heroTitle.split(' ').map((word, i) => (
                                i === 1 ? <span key={i} className="text-brand-gold block">{word} </span> : <span key={i}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-xl mb-12 font-light">
                            {settings.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#colecao" className="btn-primary flex items-center justify-center gap-2 group">
                                Ver Coleção
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a href="#lancamentos" className="btn-outline flex items-center justify-center">
                                Últimos Lançamentos
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Side Labels (Recipe 11) */}
            <div className="absolute right-10 bottom-24 hidden lg:block overflow-hidden">
                <div className="flex flex-col items-center gap-8">
                    <div className="h-24 w-[1px] bg-white/20" />
                    <span className="writing-mode-vertical-rl rotate-180 uppercase tracking-[0.5em] text-[10px] font-bold text-white/40">
                        Scroll Down
                    </span>
                </div>
            </div>

            <style>{`
                .border-text {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                }
                .writing-mode-vertical-rl {
                    writing-mode: vertical-rl;
                }
            `}</style>
        </section>
    );
}
