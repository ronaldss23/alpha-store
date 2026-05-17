import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product, Size } from '../types';
import toast from 'react-hot-toast';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, size: Size) => void;
    removeFromCart: (productId: string, size: Size) => void;
    updateQuantity: (productId: string, size: Size, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'alpha_store_cart_v2';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setCart(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load cart', e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, size: Size) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
            if (existing) {
                toast.success(`Quantidade de ${product.name} atualizada!`);
                return prev.map(item => 
                    item.id === product.id && item.selectedSize === size 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            }
            toast.success(`${product.name} adicionado ao carrinho!`);
            return [...prev, { ...product, selectedSize: size, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string, size: Size) => {
        setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
        toast.error('Item removido do carrinho');
    };

    const updateQuantity = (productId: string, size: Size, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId && item.selectedSize === size) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
        toast.success('Carrinho limpo');
    };

    const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
    const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
