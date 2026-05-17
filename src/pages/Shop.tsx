import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Categories } from '../components/Categories';
import { ProductCard } from '../components/ProductCard';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { SEO } from '../components/SEO';
import { ProductService } from '../services/productService';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';

export function Shop() {
    const { settings } = useSettings();
    const { totalItems, addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
    const loadProducts = async () => {
        const products = await ProductService.getProducts();
        setProducts(products);
        window.scrollTo(0, 0);
    };

    loadProducts();
}, []);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            let matchesCategory = activeCategory === 'Todos' || product.category === activeCategory;
            if (activeCategory === 'Lançamento' && product.isNew) matchesCategory = true;
            if (activeCategory === 'Promoção' && product.isPromo) matchesCategory = true;

            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchTerm, products]);

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold selection:text-black bg-black text-white">
            <SEO />
            
            <Header 
                cartCount={totalItems} 
                onToggleCart={() => setIsCartOpen(true)}
                onSearch={setSearchTerm}
            />
            
            <main className="flex-grow">
                <Hero />
                
                <section id="colecao">
                    <Categories 
                        activeCategory={activeCategory} 
                        onCategoryChange={setActiveCategory}
                    />

                    <div className="py-24 container mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs">Exclusividade</span>
                                <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none mt-4">
                                    {activeCategory === 'Todos' ? 'Coleção' : activeCategory} <span className="text-white/20">Alpha</span>
                                </h2>
                            </motion.div>
                            <motion.p 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-white/40 max-w-sm text-sm font-light"
                            >
                                Produtos selecionados com rigor para garantir o melhor do estilo esportivo luxo e streetwear.
                            </motion.p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <ProductCard 
                                            key={product.id} 
                                            product={product} 
                                            onAddToCart={(p, s) => addToCart(p, s)}
                                            onDetail={(p) => setSelectedProduct(p)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="py-20 text-center glass rounded-3xl">
                                <p className="text-xl text-white/40">Nenhum produto encontrado.</p>
                                <button 
                                    onClick={() => {setActiveCategory('Todos'); setSearchTerm('');}}
                                    className="mt-4 text-brand-gold underline underline-offset-8 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />

            <CartDrawer 
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            <ProductDetailModal 
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(p, s) => addToCart(p, s)}
            />
        </div>
    );
}
