import { supabase } from '../lib/supabase';

export type CategoryRecord = {
    id: string;
    name: string;
    created_at: string;
};

export const CategoryService = {
    getCategories: async (): Promise<CategoryRecord[]> => {
        const { data, error } = await supabase
            .from('categories')
            .select('id, name, created_at')
            .order('name', { ascending: true });

        if (error) {
            console.error('Erro ao buscar categorias:', error);
            return [];
        }

        return data || [];
    },

    addCategory: async (name: string): Promise<void> => {
        const cleanName = name.trim();

        if (!cleanName) {
            throw new Error('Nome da categoria é obrigatório.');
        }

        const { error } = await supabase
            .from('categories')
            .insert({ name: cleanName });

        if (error) {
            if (error.code === '23505') {
                throw new Error('Essa categoria já existe.');
            }

            console.error('Erro ao criar categoria:', error);
            throw new Error('Erro ao criar categoria.');
        }
    },

    deleteCategory: async (id: string): Promise<void> => {
        const { error } = await supabase
            .from('categories')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Erro ao remover categoria:', error);
            throw new Error('Erro ao remover categoria.');
        }
    },
};
