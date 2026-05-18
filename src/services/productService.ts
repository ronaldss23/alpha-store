import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data';
import { supabase } from '../lib/supabase';

type ProductRow = {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string | null;
    images: string[];
    category: Product['category'];
    sizes: Product['sizes'];
    is_new: boolean;
    is_promo: boolean;
    old_price?: number | null;
};

function fromSupabase(row: ProductRow): Product {
    return {
        id: row.id,
        name: row.name,
        price: Number(row.price),
        description: row.description,
        image: row.image || undefined,
        images: row.images || [],
        category: row.category,
        sizes: row.sizes || [],
        isNew: row.is_new,
        isPromo: row.is_promo,
        oldPrice: row.old_price ? Number(row.old_price) : undefined
    };
}

function toSupabase(product: Product): ProductRow {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image || product.images?.[0] || null,
        images: product.images || [],
        category: product.category,
        sizes: product.sizes || [],
        is_new: !!product.isNew,
        is_promo: !!product.isPromo,
        old_price: product.oldPrice || null
    };
}

export const ProductService = {
    getProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products_v2')
        .select('id, name, price, description, image, images, category, sizes, is_new, is_promo, old_price');

    if (error) {
        console.error('Erro ao buscar produtos no Supabase:', error);
        return [];
    }

    return (data || []).map(fromSupabase);
},

    seedInitialProducts: async () => {
    // Desativado após migração para o Supabase.
    // Os produtos agora são gerenciados pelo painel admin.
    return;
},

    saveProducts: async (products: Product[]) => {
        const { error: deleteError } = await supabase
            .from('products_v2')
            .delete()
            .neq('id', '');

        if (deleteError) {
            console.error('Erro ao limpar produtos:', deleteError);
            throw deleteError;
        }

        const { error: insertError } = await supabase
            .from('products_v2')
            .insert(products.map(toSupabase));

        if (insertError) {
            console.error('Erro ao salvar produtos:', insertError);
            throw insertError;
        }
    },

    addProduct: async (product: Product) => {
        const { error } = await supabase
            .from('products_v2')
            .insert(toSupabase(product));

        if (error) {
            console.error('Erro ao adicionar produto:', error);
            throw error;
        }
    },

    updateProduct: async (updatedProduct: Product) => {
        const { error } = await supabase
            .from('products_v2')
            .update(toSupabase(updatedProduct))
            .eq('id', updatedProduct.id);

        if (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    },

    deleteProduct: async (id: string) => {
        const { error } = await supabase
            .from('products_v2')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }
};
