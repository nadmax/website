import fs from 'fs';
import path from 'path';
import { Translations } from '../types/translations';

const translationsCache: { [key: string]: Translations } = {};

export async function loadTranslations(lang: string, page: string): Promise<Translations> {
    const cacheKey = `${lang}-${page}`;

    if (translationsCache[cacheKey])
        return translationsCache[cacheKey];

    try {
        const commonPath = path.resolve(__dirname, `../locales/${lang}/common.json`);
        const pagePath = path.resolve(__dirname, `../locales/${lang}/${page}.json`);
        const common = JSON.parse(await fs.promises.readFile(commonPath, "utf-8"));
        let pageTranslations = {};
        if (fs.existsSync(pagePath))
            pageTranslations = JSON.parse(await fs.promises.readFile(pagePath, "utf-8"));
        
        const translations = {
            common,
            page: pageTranslations 
        };

        translationsCache[cacheKey] = translations;
    
        return translations;
    } catch (error) {
        console.error(`Error loading translations for ${lang}/${page}:`, error);

        return {};
    }
}