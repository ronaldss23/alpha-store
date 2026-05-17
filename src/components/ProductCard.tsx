import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, Size } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, size: Size) => void;
    onDetail: (product: Product) => void;
    key?: string | number;
}

export function ProductCard({ product, onAddToCart, onDetail }: ProductCardProps) {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedSize) {
            onDetail(product);
            return;
        }
        onAddToCart(product, selectedSize);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onDetail(product)}
            className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-brand-gray/40 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 cursor-pointer"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {product.isNew && (
                    <span className="px-3 py-1 bg-brand-gold text-black text-[10px] font-extrabold uppercase tracking-widest rounded-sm">
                        Novo
                    </span>
                )}
                {product.isPromo && (
                    <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-sm">
                        Sale
                    </span>
                )}
            </div>

            {/* Image Container with Carousel Controls */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentImageIndex}
                        src={product.images[currentImageIndex]} 
                        alt={product.name} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110 blur-[2px]' : 'scale-100'}`}
                    />
                </AnimatePresence>
                
                {/* Image Navigation Dots */}
                {product.images.length > 1 && (
                    <div className="absolute top-4 right-4 z-20 flex gap-1">
                        {product.images.map((_, idx) => (
                            <div 
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-brand-gold w-4' : 'bg-white/40'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Navigation Arrows (Visible only on hover or mobile always) */}
                {product.images.length > 1 && (
                    <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0 sm:opacity-100'}`}>
                        <button 
                            onClick={prevImage}
                            className="bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-brand-gold hover:text-black transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="bg-black/40 backdrop-blur-md p-2 rounded-full hover:bg-brand-gold hover:text-black transition-all"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
                
                {/* Size Selector Overlay on hover */}
                <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex gap-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedSize(size);
                                }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    selectedSize === size 
                                        ? 'bg-brand-gold text-black scale-110 shadow-[0_0_15px_rgba(197,160,89,0.5)]' 
                                        : 'bg-white/20 text-white hover:bg-white/40'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-[10px] text-brand-gold uppercase font-bold tracking-[0.2em] mb-2">{product.category}</span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors leading-tight">
                    {product.name}
                </h3>
                <p className="text-white/40 text-sm line-clamp-2 mb-4 flex-grow font-light">
                    {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        {product.oldPrice && (
                            <span className="text-xs text-white/30 line-through">R$ {product.oldPrice.toFixed(2)}</span>
                        )}
                        <span className="text-xl font-display font-bold">
                            R$ {product.price.toFixed(2)}
                        </span>
                    </div>
                    <button 
                        onClick={handleAdd}
                        disabled={!selectedSize}
                        className={`p-3 rounded-xl transition-all ${
                            selectedSize 
                                ? 'bg-brand-gold text-black hover:scale-110 active:scale-95 shadow-[0_5px_15px_rgba(197,160,89,0.3)]' 
                                : 'bg-white/5 text-white/20 shadow-none cursor-not-allowed'
                        }`}
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
