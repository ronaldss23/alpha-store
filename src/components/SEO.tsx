import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettings } from '../contexts/SettingsContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
}

export function SEO({ title, description, image, article }: SEOProps) {
    const { settings } = useSettings();
    
    const seoTitle = title ? `${title} | ${settings.name}` : settings.name;
    const seoDescription = description || settings.description;
    const seoImage = image || settings.logo;
    const siteUrl = window.location.origin;

    return (
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="image" content={seoImage} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            {seoImage && <meta property="og:image" content={seoImage} />}
            <meta property="og:url" content={siteUrl} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            {seoImage && <meta name="twitter:image" content={seoImage} />}

            {/* Theme Color */}
            <meta name="theme-color" content={settings.primaryColor} />
            
            <link rel="canonical" content={siteUrl} />
        </Helmet>
    );
}
