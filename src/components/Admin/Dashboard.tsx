import React, { useState, useEffect } from 'react';
import { Product, Category, Size } from '../../types';
import { ProductService } from '../../services/productService';
import { Plus, Edit2, Trash2, Save, X, LogOut, Package, DollarSign, Tag, Info, Upload, LayoutDashboard, Settings as SettingsIcon, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRef } from 'react';
import { SettingsTab } from './SettingsTab';
import { UsersTab } from './UsersTab';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

type Tab = 'products' | 'settings' | 'users';

export function AdminDashboard() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('products');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditing, setIsEditing] = useState<Product | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    
    // New/Edit product form state
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        description: '',
        images: [],
        category: 'Camisa de Time',
        sizes: ['P', 'M', 'G', 'GG'],
        isNew: false,
        isPromo: false,
        oldPrice: 0
    });

    const [currentImageUrl, setCurrentImageUrl] = useState('');

    useEffect(() => {
    const loadProducts = async () => {
        const products = await ProductService.getProducts();
        setProducts(products);
    };

    loadProducts();
}, []);

    const addImageUrl = () => {
        if (!currentImageUrl) return;
        const currentImages = formData.images || [];
        setFormData({ ...formData, images: [...currentImages, currentImageUrl] });
        setCurrentImageUrl('');
    };

    const removeImageUrl = (index: number) => {
        const currentImages = formData.images || [];
        setFormData({ ...formData, images: currentImages.filter((_, i) => i !== index) });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        Array.from(files).forEach((file: File) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData(prev => ({
                    ...prev,
                    images: [...(prev.images || []), base64String]
                }));
            };
            reader.readAsDataURL(file);
        });
        
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSave = async () => {
        if (!formData.name || !formData.price || (!formData.images || formData.images.length === 0)) {
            toast.error('Preencha os campos obrigatórios (Nome, Preço, Pelo menos 1 Imagem)');
            return;
        }

        const productToSave: Product = {
            id: isEditing ? isEditing.id : Date.now().toString(),
            name: formData.name!,
            price: Number(formData.price),
            description: formData.description || '',
            images: formData.images!,
            category: (formData.category as Category) || 'Camisa de Time',
            sizes: (formData.sizes as Size[]) || ['P', 'M', 'G', 'GG'],
            isNew: !!formData.isNew,
            isPromo: !!formData.isPromo,
            oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined
        };

        if (isEditing) {
            await ProductService.updateProduct(productToSave);
            toast.success('Produto atualizado!');
        } else {
            await ProductService.addProduct(productToSave);
            toast.success('Produto criado!');
        }

         setProducts(await ProductService.getProducts());
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            await ProductService.deleteProduct(id);
            setProducts( await ProductService.getProducts());
            toast.success('Produto excluído');
        }
    };

    const resetForm = () => {
        setIsEditing(null);
        setIsAdding(false);
        setFormData({
            name: '',
            price: 0,
            description: '',
            images: [],
            category: 'Camisa de Time',
            sizes: ['P', 'M', 'G', 'GG'],
            isNew: false,
            isPromo: false,
            oldPrice: 0
        });
    };

    const startEdit = (product: Product) => {
        setIsEditing(product);
        setFormData(product);
        setIsAdding(true);
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen bg-brand-black text-white p-6 md:p-12">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold uppercase tracking-tighter">
                            Painel <span className="text-brand-gold">Administrativo</span>
                        </h1>
                        <p className="text-white/40 mt-2">Gerencie sua loja Alpha Store em tempo real.</p>
                    </div>
                    
                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 self-start md:self-center">
                        <button 
                            onClick={() => setActiveTab('products')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-wider",
                                activeTab === 'products' ? "bg-brand-gold text-black shadow-lg" : "text-white/40 hover:text-white"
                            )}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Produtos
                        </button>
                        <button 
                            onClick={() => setActiveTab('settings')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-wider",
                                activeTab === 'settings' ? "bg-brand-gold text-black shadow-lg" : "text-white/40 hover:text-white"
                            )}
                        >
                            <SettingsIcon className="w-4 h-4" />
                            Configurações
                        </button>
                        <button 
                            onClick={() => setActiveTab('users')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-wider",
                                activeTab === 'users' ? "bg-brand-gold text-black shadow-lg" : "text-white/40 hover:text-white"
                            )}
                        >
                            <Users className="w-4 h-4" />
                            Usuários
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button 
                            onClick={handleLogout}
                            className="bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-500 p-4 rounded-2xl transition-all border border-white/10"
                            title="Sair do Painel"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {activeTab === 'products' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Dashboard Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="glass p-8 rounded-[2rem] border border-white/5 group hover:border-brand-gold/20 transition-all">
                                <div className="p-3 bg-brand-gold/10 rounded-2xl w-fit mb-6 text-brand-gold group-hover:scale-110 transition-transform">
                                    <Package className="w-6 h-6" />
                                </div>
                                <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Total Stock</span>
                                <h3 className="text-4xl font-bold mt-2">{products.length} <span className="text-sm text-white/20 font-normal">ITENS</span></h3>
                            </div>
                            <div className="glass p-8 rounded-[2rem] border border-white/5 group hover:border-brand-gold/20 transition-all">
                                <div className="p-3 bg-brand-gold/10 rounded-2xl w-fit mb-6 text-brand-gold group-hover:scale-110 transition-transform">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Average Price</span>
                                <h3 className="text-4xl font-bold mt-2">
                                    R$ {(products.reduce((acc, p) => acc + p.price, 0) / (products.length || 1)).toFixed(0)}
                                </h3>
                            </div>
                            <div className="glass p-8 rounded-[2rem] border border-white/5 group hover:border-brand-gold/20 transition-all">
                                <div className="p-3 bg-red-500/10 rounded-2xl w-fit mb-6 text-red-500 group-hover:scale-110 transition-transform">
                                    <Tag className="w-6 h-6" />
                                </div>
                                <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Campaigns</span>
                                <h3 className="text-4xl font-bold mt-2">
                                    {products.filter(p => p.isPromo).length} <span className="text-sm text-white/20 font-normal">EM PROMO</span>
                                </h3>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Listagem de Catálogo</h2>
                            <button 
                                onClick={() => setIsAdding(true)}
                                className="btn-primary flex items-center gap-3 px-8 py-4 shadow-xl"
                            >
                                <Plus className="w-5 h-5" />
                                Adicionar Novo Item
                            </button>
                        </div>

                        {/* Product List */}
                        <div className="glass rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/10">
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Item / SKU</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Categoria</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Precificidade</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40">Indicadores</th>
                                            <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Ações Rápidas</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-20 text-center text-white/20 italic">
                                                    Nenhum produto cadastrado no momento.
                                                </td>
                                            </tr>
                                        ) : products.map((product) => (
                                            <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className="relative">
                                                            <img src={product.images[0] || product.image || ''} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt="" />
                                                            {product.isPromo && <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-black shadow-lg"></div>}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-lg mb-1">{product.name}</p>
                                                            <p className="text-[10px] uppercase font-bold tracking-widest text-white/30 truncate max-w-[200px]">ID: {product.id.slice(-8).toUpperCase()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-[10px] font-bold uppercase tracking-tighter bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-brand-gold">{product.category}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="font-bold text-lg">R$ {product.price.toFixed(2)}</p>
                                                    {product.oldPrice && <p className="text-xs text-white/20 line-through">R$ {product.oldPrice.toFixed(2)}</p>}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex gap-2">
                                                        {product.isNew && (
                                                            <span className="px-2 py-1 bg-brand-gold/10 text-brand-gold text-[9px] font-black uppercase rounded tracking-widest border border-brand-gold/20">NEW</span>
                                                        )}
                                                        {product.isPromo && (
                                                            <span className="px-2 py-1 bg-red-500/10 text-red-500 text-[9px] font-black uppercase rounded tracking-widest border border-red-500/20">OFF</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => startEdit(product)}
                                                            className="p-3 bg-white/5 hover:bg-brand-gold hover:text-black rounded-xl transition-all border border-white/5"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-3 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all border border-white/5"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'settings' ? (
                    <SettingsTab />
                ) : (
                    <UsersTab />
                )}
            </div>

            {/* Modal de Edição/Adição */}
            <AnimatePresence>
                {isAdding && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200]"
                            onClick={resetForm}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-brand-gray border border-white/10 p-10 rounded-[3rem] z-[210] overflow-y-auto max-h-[90vh] shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-brand-gold rounded-2xl flex items-center justify-center text-black">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-3xl font-display font-bold uppercase tracking-tight">
                                        {isEditing ? 'Configurar Produto' : 'Cadastrar novo produto'}
                                    </h3>
                                </div>
                                <button onClick={resetForm} className="p-3 hover:bg-white/5 rounded-full transition-all">
                                    <X className="w-8 h-8 text-white/40 hover:text-white" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Label Principal / Nome *</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all placeholder:text-white/10"
                                            placeholder="Ex: Camisa Barcelona 24/25 Retro"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Ativos Visuais / Galeria *</label>
                                        <div className="space-y-4">
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    value={currentImageUrl}
                                                    onChange={(e) => setCurrentImageUrl(e.target.value)}
                                                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all text-sm"
                                                    placeholder="URL da Imagem externa..."
                                                />
                                                <button 
                                                    onClick={addImageUrl}
                                                    type="button"
                                                    className="bg-brand-gold text-black px-6 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
                                                >
                                                    Add URL
                                                </button>
                                            </div>
                                            
                                            <div className="relative">
                                                <input 
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileUpload}
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-5 rounded-2xl transition-all text-sm font-bold group"
                                                >
                                                    <Upload className="w-5 h-5 text-brand-gold group-hover:-translate-y-1 transition-transform" />
                                                    Selecionar do meu dispositivo
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-4 gap-2 pt-2">
                                                {(formData.images || []).map((img, idx) => (
                                                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 bg-black">
                                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                                        <button 
                                                            onClick={() => removeImageUrl(idx)} 
                                                            className="absolute inset-0 bg-red-500/80 items-center justify-center hidden group-hover:flex transition-all"
                                                        >
                                                            <Trash2 className="w-5 h-5 text-white" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {(!formData.images || formData.images.length === 0) && (
                                                    <div className="col-span-4 py-8 border-2 border-dashed border-white/5 rounded-2xl text-center text-white/10 text-[10px] uppercase font-bold tracking-widest">
                                                        Nenhuma imagem anexada
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Preço Atual (R$) *</label>
                                            <input 
                                                type="number" 
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all font-bold text-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Preço De (R$)</label>
                                            <input 
                                                type="number" 
                                                value={formData.oldPrice}
                                                onChange={(e) => setFormData({...formData, oldPrice: Number(e.target.value)})}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all text-white/50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Categorização Profissional</label>
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:border-brand-gold outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Camisa de Time">Camisa de Time</option>
                                            <option value="Casual">Casual</option>
                                            <option value="Esportiva">Esportiva</option>
                                            <option value="Lançamento">Lançamento</option>
                                            <option value="Promoção">Promoção</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Tamanhos Disponíveis</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['P', 'M', 'G', 'GG', 'XG'].map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    onClick={() => {
                                                        const current = formData.sizes || [];
                                                        if (current.includes(size as Size)) {
                                                            setFormData({...formData, sizes: current.filter(s => s !== size)});
                                                        } else {
                                                            setFormData({...formData, sizes: [...current, size as Size]});
                                                        }
                                                    }}
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl border font-bold text-xs transition-all",
                                                        formData.sizes?.includes(size as Size) 
                                                        ? "bg-brand-gold border-brand-gold text-black" 
                                                        : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                                    )}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-3 font-bold ml-1">Descrição Comercial</label>
                                        <textarea 
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-brand-gold outline-none h-32 resize-none transition-all placeholder:text-white/10"
                                            placeholder="Descreva detalhes que vendem: tecido premium, ajuste atlético, edição limitada..."
                                        />
                                    </div>
                                    
                                    <div className="flex items-center gap-10 pt-4">
                                        <label className="flex items-center gap-4 cursor-pointer group">
                                            <div className={cn(
                                                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                                formData.isNew ? "bg-brand-gold border-brand-gold" : "border-white/20 group-hover:border-brand-gold/40"
                                            )}>
                                                {formData.isNew && <X className="w-4 h-4 text-black rotate-45" />}
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={formData.isNew}
                                                onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                                                className="hidden"
                                            />
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/60">É Lançamento?</span>
                                        </label>
                                        
                                        <label className="flex items-center gap-4 cursor-pointer group">
                                            <div className={cn(
                                                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                                                formData.isPromo ? "bg-red-500 border-red-500" : "border-white/20 group-hover:border-red-500/40"
                                            )}>
                                                {formData.isPromo && <X className="w-4 h-4 text-white rotate-45" />}
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={formData.isPromo}
                                                onChange={(e) => setFormData({...formData, isPromo: e.target.checked})}
                                                className="hidden"
                                            />
                                            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Está em Promoção?</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-white/5 flex gap-4">
                                <button 
                                    onClick={handleSave}
                                    className="flex-grow bg-brand-gold text-black py-6 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(197,160,89,0.3)]"
                                >
                                    <Save className="w-6 h-6" />
                                    {isEditing ? 'Confirmar Atualização' : 'Efetivar Cadastro'}
                                </button>
                                <button 
                                    onClick={resetForm}
                                    className="px-10 py-6 bg-white/5 hover:bg-white/10 text-white/60 rounded-2xl font-bold uppercase tracking-widest transition-all border border-white/10"
                                >
                                    Descartar
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
