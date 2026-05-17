import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreSettings } from '../types';
import { supabase } from '../lib/supabase';

interface SettingsContextType {
    settings: StoreSettings;
    updateSettings: (newSettings: StoreSettings) => Promise<void>;
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

type StoreSettingsRow = {
    id: string;
    name: string | null;
    phone_number: string | null;
    instagram: string | null;
    facebook: string | null;
    email: string | null;
    welcome_message: string | null;
    hero_title: string | null;
    hero_tagline: string | null;
    description: string | null;
    announcement_text: string | null;
    show_announcement: boolean | null;
    primary_color: string | null;
};

function fromSupabase(row: StoreSettingsRow | null): StoreSettings {
    if (!row) {
        return DEFAULT_SETTINGS;
    }

    return {
        name: row.name || DEFAULT_SETTINGS.name,
        phoneNumber: row.phone_number || DEFAULT_SETTINGS.phoneNumber,
        instagram: row.instagram || DEFAULT_SETTINGS.instagram,
        facebook: row.facebook || DEFAULT_SETTINGS.facebook,
        email: row.email || DEFAULT_SETTINGS.email,
        welcomeMessage: row.welcome_message || DEFAULT_SETTINGS.welcomeMessage,
        heroTitle: row.hero_title || DEFAULT_SETTINGS.heroTitle,
        heroTagline: row.hero_tagline || DEFAULT_SETTINGS.heroTagline,
        description: row.description || DEFAULT_SETTINGS.description,
        announcementText: row.announcement_text || DEFAULT_SETTINGS.announcementText,
        showAnnouncement: row.show_announcement ?? DEFAULT_SETTINGS.showAnnouncement,
        primaryColor: row.primary_color || DEFAULT_SETTINGS.primaryColor,
    };
}

function toSupabase(settings: StoreSettings) {
    return {
        id: 'main',
        name: settings.name,
        phone_number: settings.phoneNumber,
        instagram: settings.instagram,
        facebook: settings.facebook,
        email: settings.email,
        welcome_message: settings.welcomeMessage,
        hero_title: settings.heroTitle,
        hero_tagline: settings.heroTagline,
        description: settings.description,
        announcement_text: settings.announcementText,
        show_announcement: settings.showAnnouncement,
        primary_color: settings.primaryColor,
        updated_at: new Date().toISOString(),
    };
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            const { data, error } = await supabase
                .from('store_settings')
                .select('*')
                .eq('id', 'main')
                .maybeSingle();

            if (error) {
                console.error('Erro ao carregar configurações:', error);
                setSettings(DEFAULT_SETTINGS);
                setIsLoading(false);
                return;
            }

            if (!data) {
                const { error: insertError } = await supabase
                    .from('store_settings')
                    .insert(toSupabase(DEFAULT_SETTINGS));

                if (insertError) {
                    console.error('Erro ao criar configurações padrão:', insertError);
                }

                setSettings(DEFAULT_SETTINGS);
                setIsLoading(false);
                return;
            }

            setSettings(fromSupabase(data));
            setIsLoading(false);
        };

        loadSettings();
    }, []);

    const updateSettings = async (newSettings: StoreSettings) => {
        setSettings(newSettings);

        const { error } = await supabase
            .from('store_settings')
            .upsert(toSupabase(newSettings), { onConflict: 'id' });

        if (error) {
            console.error('Erro ao salvar configurações:', error);
            throw error;
        }
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