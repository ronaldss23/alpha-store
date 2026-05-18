export type Category = string;

export type Size = 'P' | 'M' | 'G' | 'GG' | 'XG';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string; // Mantido temporariamente para migração
    images: string[];
    category: Category;
    sizes: Size[];
    isNew?: boolean;
    isPromo?: boolean;
    oldPrice?: number;
}

export interface CartItem extends Product {
    selectedSize: Size;
    quantity: number;
}

export interface StoreSettings {
    name: string;
    phoneNumber: string;
    instagram: string;
    facebook: string;
    email: string;
    logo?: string;
    heroBanner?: string;
    welcomeMessage: string;
    heroTitle: string;
    heroTagline: string;
    description: string;
    announcementText?: string;
    showAnnouncement: boolean;
    primaryColor: string;
}

export interface User {
    id: string;
    username: string;
    role: 'admin';
    createdAt: string;
}

export interface AdminCredentials extends User {
    password?: string; // Only used for internal storage mock
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
}
