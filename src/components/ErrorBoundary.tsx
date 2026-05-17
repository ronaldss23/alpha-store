import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RotateCcw } from 'lucide-react';

function ErrorFallback() {
    const handleReset = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-sans">
            <div className="max-w-md w-full bg-brand-gray/50 border border-white/10 p-12 rounded-[2rem] text-center backdrop-blur-xl">
                <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <AlertTriangle className="w-10 h-10 text-brand-gold" />
                </div>
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Ops! Algo deu errado.</h1>
                <p className="text-white/60 mb-10 font-light">
                    Ocorreu um erro inesperado. Já reportamos isso para nossa equipe técnica.
                </p>
                <button
                    onClick={handleReset}
                    className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm"
                >
                    <RotateCcw className="w-5 h-5" />
                    Recarregar Loja
                </button>
            </div>
        </div>
    );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <ReactErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    );
}
