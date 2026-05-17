import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreSettings } from '../types';

interface SettingsContextType {
    settings: StoreSettings;
    updateSettings: (newSettings: StoreSettings) => void;
    isLoading: boolean;
}

const DEFAULT_SETTINGS: StoreSettings = {
    name: 'Alpha Store',
    phoneNumber: '5511999999999',
    instagram: 'https://instagram.com/alphastore',
    facebook: 'https://facebook.com/alphastore',
    email: 'contato@alphastore.com.br',
    welcomeMessage: 'Olá! Vim pelo catálogo e gostaria de mais informações sobre estes produtos:',
    heroTitle: 'O Padrão Alpha Premium',
    heroTagline: 'Sempre Novas Coleções',
    description: 'Vista-se com a autoridade que você merece. Nossa curadoria reúne os mantos mais exclusivos e o streetwear de elite.',
    announcementText: 'Frete grátis em compras acima de R$ 300,00!',
    showAnnouncement: true,
    primaryColor: '#c5a059',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('alpha_store_settings');
        if (saved) {
            try {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
            } catch (e) {
                console.error('Failed to parse settings', e);
            }
        }
        setIsLoading(false);
    }, []);

    const updateSettings = (newSettings: StoreSettings) => {
        setSettings(newSettings);
        localStorage.setItem('alpha_store_settings', JSON.stringify(newSettings));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
