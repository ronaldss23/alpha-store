import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export function Hero() {
    const { settings } = useSettings();

    const heroImage = settings.heroBanner || '/hero-football.jpg';

    return (
        <section
            id="inicio"
            className="relative min-h-[760px] md:min-h-[860px] overflow-hidden bg-black flex items-center"
        >
            {/* Imagem de fundo */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Alpha Store"
                    className="w-full h-full object-cover object-center opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(197,160,89,0.18),transparent_35%)]" />
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pt-40 md:pt-52 pb-24">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-brand-gold/30 bg-black/35 backdrop-blur-sm mb-8">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] font-black text-brand-gold">
                            {settings.heroTagline || 'Sempre novas coleções'}
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white">
                        {settings.heroTitle || 'O Padrão'} <br />
                        <span className="text-brand-gold">Alpha</span>
                    </h1>

                    <p className="mt-8 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
                        {settings.description ||
                            'Vista-se com a autoridade que você merece. Camisas de time, moda esportiva e peças selecionadas para quem busca presença.'}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <a
                            href="#colecao"
                            className="inline-flex items-center justify-center gap-3 bg-brand-gold text-black px-8 py-5 rounded-2xl font-black uppercase tracking-[0.18em] text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(197,160,89,0.22)]"
                        >
                            Ver coleção
                            <ArrowRight className="w-5 h-5" />
                        </a>

                        <a
                            href="#lancamentos"
                            className="inline-flex items-center justify-center border border-white/15 bg-white/5 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.18em] text-xs hover:border-brand-gold/50 hover:text-brand-gold transition-all"
                        >
                            Lançamentos
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}