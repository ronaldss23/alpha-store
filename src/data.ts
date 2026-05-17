import { Product } from './types';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Camisa PSG Home 24/25',
        price: 349.90,
        description: 'A nova armadura parisiense. Tecnologia de alta performance e design elegante.',
        images: ['https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=800&auto=format&fit=crop'],
        category: 'Camisa de Time',
        sizes: ['P', 'M', 'G', 'GG'],
        isNew: true
    },
    {
        id: '2',
        name: 'Camiseta Nike Sportswear Tech',
        price: 189.90,
        description: 'Camiseta casual de algodão premium com logo minimalista.',
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop'],
        category: 'Casual',
        sizes: ['M', 'G', 'GG'],
        isNew: false
    },
    {
        id: '3',
        name: 'Camisa Real Madrid Away 24/25',
        price: 349.90,
        description: 'Elegância madridista em cada detalhe. O manto sagrado dos merengues.',
        images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop'],
        category: 'Camisa de Time',
        sizes: ['P', 'M', 'G', 'GG', 'XG'],
        isNew: true
    },
    {
        id: '4',
        name: 'Camiseta Jordan Flight',
        price: 159.90,
        oldPrice: 229.90,
        description: 'Estilo street clássico com a herança do rei do basquete.',
        images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'],
        category: 'Promoção',
        sizes: ['P', 'M', 'G'],
        isPromo: true
    },
    {
        id: '5',
        name: 'Camisa Brazil Special Edition',
        price: 299.90,
        description: 'Edição limitada em tons de cinza e neon. Design futurista.',
        images: ['https://images.unsplash.com/photo-1543326131-cc2830836c47?q=80&w=800&auto=format&fit=crop'],
        category: 'Lançamento',
        sizes: ['M', 'G', 'GG'],
        isNew: true
    },
    {
        id: '6',
        name: 'Camisa Inter de Milão 24/25',
        price: 349.90,
        description: 'As famosas listras nerazzurri em uma versão moderna e tecnológica.',
        images: ['https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=800&auto=format&fit=crop'],
        category: 'Camisa de Time',
        sizes: ['P', 'M', 'G', 'GG'],
        isNew: false
    },
    {
        id: '7',
        name: 'Short Nike Pro Training',
        price: 149.90,
        description: 'Desenvolvido para máxima performance em seus treinos mais intensos.',
        images: ['https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=800&auto=format&fit=crop'],
        category: 'Esportiva',
        sizes: ['P', 'M', 'G', 'GG'],
        isNew: false
    }
];
