import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Product, Size } from '../types';

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
    onAddToCart: (product: Product, size: Size) => void;
}

export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!product) return null;

    const handleAdd = () => {
        if (!selectedSize) {
            alert('Por favor, selecione um tamanho');
            return;
        }
        onAddToCart(product, selectedSize);
        onClose();
    };

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

    return (
        <AnimatePresence>
            {product && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl bg-brand-gray border border-white/10 rounded-[2.5rem] z-[210] overflow-hidden shadow-2xl"
                    >
                        <button 
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-brand-gold hover:text-black transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                            {/* Left: Image Gallery */}
                            <div className="md:w-1/2 relative aspect-square md:aspect-auto h-[400px] md:h-auto bg-[#0a0a0a]">
                                <AnimatePresence mode="wait">
                                    <motion.img 
                                        key={currentImageIndex}
                                        src={product.images[currentImageIndex]}
                                        className="w-full h-full object-cover"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </AnimatePresence>

                                {product.images.length > 1 && (
                                    <>
                                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6">
                                            <button onClick={prevImage} className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-brand-gold hover:text-black transition-all">
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button onClick={nextImage} className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-brand-gold hover:text-black transition-all">
                                                <ChevronRight className="w-4 h-6" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                            {product.images.map((_, idx) => (
                                                <button 
                                                    key={idx}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-brand-gold w-6' : 'bg-white/20'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right: Details */}
                            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-8">
                                    <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
                                        {product.category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold uppercase leading-none mb-4">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <span className="text-3xl font-bold">R$ {product.price.toFixed(2)}</span>
                                        {product.oldPrice && (
                                            <span className="text-lg text-white/30 line-through">R$ {product.oldPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-4">Descrição do Produto</h4>
                                        <p className="text-white/60 font-light leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40">Selecione o Tamanho</h4>
                                            <span className="text-[10px] text-brand-gold underline cursor-pointer">Guia de Medidas</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold border transition-all ${
                                                        selectedSize === size 
                                                            ? 'bg-brand-gold border-brand-gold text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]' 
                                                            : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                                                    }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleAdd}
                                        disabled={!selectedSize}
                                        className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                                            selectedSize 
                                                ? 'bg-brand-gold text-black shadow-[0_10px_30px_rgba(197,160,89,0.2)]' 
                                                : 'bg-white/5 text-white/20 cursor-not-allowed'
                                        }`}
                                    >
                                        <ShoppingBag className="w-6 h-6" />
                                        {selectedSize ? `Adicionar Tamanho ${selectedSize}` : 'Selecione seu Tamanho'}
                                    </button>

                                    <div className="flex items-center gap-6 justify-center text-white/30">
                                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                                            <Check className="w-3 h-3 text-brand-gold" />
                                            Qualidade Premium
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
                                            <Check className="w-3 h-3 text-brand-gold" />
                                            Padrão Alpha
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
