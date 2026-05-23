import React from 'react';

export function Hero() {
    return (
        <section
            id="inicio"
            className="relative h-[720px] md:h-[820px] overflow-hidden bg-black"
        >
            {/* Fundo */}
            <div className="absolute inset-0">
                <img
                    src="/topo-logo.png"
                    alt="Alpha Store Hero"
                    className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_38%,rgba(199,162,89,0.25),transparent_32%)]" />
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex items-center pt-28">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-brand-gold/35 bg-black/35 backdrop-blur-sm mb-8">
                        <span className="text-brand-gold">✦</span>
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.28em] font-black text-brand-gold">
                            Sempre novas coleções
                        </span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.86] tracking-tighter text-white">
                        O Padrão <br />
                        Alpha <br />
                        Premium
                    </h1>

                    <div className="mt-8">
                        <img
                            src="/topo-logo.png"
                            alt="Alpha Store"
                            className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[390px] object-contain drop-shadow-[0_0_35px_rgba(197,160,89,0.25)]"
                        />
                    </div>

                    <p className="mt-6 max-w-xl text-sm md:text-base text-white/65 leading-relaxed">
                        Vista-se com autoridade. Camisas de time, moda esportiva e peças selecionadas para quem busca presença.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a
                            href="#colecao"
                            className="inline-flex items-center justify-center bg-brand-gold text-black px-8 py-5 rounded-2xl font-black uppercase tracking-[0.18em] text-xs hover:scale-105 active:scale-95 transition-all"
                        >
                            Ver coleção →
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