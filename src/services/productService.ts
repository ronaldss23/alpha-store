import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data';

const STORAGE_KEY = 'alpha_store_products';

export const ProductService = {
    getProducts: (): Product[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        let products: Product[] = [];
        
        if (stored) {
            try {
                products = JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing stored products', e);
                products = INITIAL_PRODUCTS;
            }
        } else {
            products = INITIAL_PRODUCTS;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
        }

        // Migration: ensure images array exists for all products
        return products.map(p => {
            if (!p.images || !Array.isArray(p.images)) {
                return {
                    ...p,
                    images: p.image ? [p.image] : []
                };
            }
            return p;
        });
    },

    saveProducts: (products: Product[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    },

    addProduct: (product: Product) => {
        const products = ProductService.getProducts();
        products.push(product);
        ProductService.saveProducts(products);
    },

    updateProduct: (updatedProduct: Product) => {
        const products = ProductService.getProducts();
        const index = products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            products[index] = updatedProduct;
            ProductService.saveProducts(products);
        }
    },

    deleteProduct: (id: string) => {
        const products = ProductService.getProducts();
        const filtered = products.filter(p => p.id !== id);
        ProductService.saveProducts(filtered);
    }
};
