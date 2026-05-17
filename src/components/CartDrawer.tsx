import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
    const { settings } = useSettings();

    const handleWhatsAppCheckout = () => {
        let message = `*PEDIDO ALPHA STORE*\n\n${settings.welcomeMessage}\n\n`;
        
        cart.forEach(item => {
            message += `• *${item.name}*\nTamanho: ${item.selectedSize}\nQtd: ${item.quantity}\nSub: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
        });
        
        message += `*TOTAL: R$ ${subtotal.toFixed(2)}*\n\n---`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${settings.phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                        aria-hidden="true"
                    />

                    {/* Drawer */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-gray/95 border-l border-white/10 z-[110] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-brand-gold" />
                                <h2 id="cart-title" className="text-xl font-bold font-display uppercase tracking-wider">Seu Carrinho</h2>
                                <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-bold" aria-label={`${totalItems} itens no carrinho`}>{totalItems}</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors" aria-label="Fechar carrinho">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                    <ShoppingBag className="w-16 h-16" />
                                    <p className="text-lg">Seu carrinho está vazio</p>
                                    <button onClick={onClose} className="text-brand-gold underline underline-offset-4" aria-label="Voltar para a loja">Começar a comprar</button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                                            <img src={item.images?.[0] || item.image || ''} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-sm leading-tight pr-2">{item.name}</h3>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                        className="text-white/20 hover:text-red-500 transition-colors"
                                                        aria-label={`Remover ${item.name} tamanho ${item.selectedSize}`}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-1">
                                                    Tamanho: {item.selectedSize}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-3 bg-black/40 rounded-full px-2 py-1">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:text-brand-gold"
                                                        aria-label="Diminuir quantidade"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-xs font-bold w-4 text-center" aria-label={`Quantidade: ${item.quantity}`}>{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:text-brand-gold"
                                                        aria-label="Aumentar quantidade"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 bg-brand-black border-t border-white/10 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-white/60">
                                        <span>Subtotal</span>
                                        <span>R$ {subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold font-display uppercase tracking-widest pt-2 border-t border-white/5">
                                        <span>Total</span>
                                        <span className="text-brand-gold">R$ {subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Enviar Pedido no WhatsApp
                                </button>
                                <p className="text-[10px] text-center text-white/30 uppercase tracking-widest">
                                    Finalize seu pedido em segundos
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
