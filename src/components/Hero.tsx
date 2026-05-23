import React from 'react';

export function Hero() {
    return (
        <section
            id="inicio"
            className="relative h-[720px] md:h-[820px] overflow-hidden bg-black"
        >
            {/* Fundo principal */}
            <div className="absolute inset-0">
                <img
                    src="/hero-topo.png"
                    alt="Alpha Store Hero"
                    className="w-full h-full object-cover object-center"
                />

                {/* Escurecimento */}
                <div className="absolute inset-0 bg-black/35" />

                {/* Gradiente lateral igual ao mockup */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />

                {/* Glow dourado à esquerda */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(199,162,89,0.22),transparent_28%)]" />

                {/* Linha de brilho central baixa */}
                <div className="absolute left-0 right-0 top-[48%] h-[2px] bg-gradient-to-r from-transparent via-[#d2b16a]/50 to-transparent blur-sm" />
            </div>

            {/* Espaço visual: sem textão gigante */}
            <div className="relative z-10 h-full w-full" />
        </section>
    );
}