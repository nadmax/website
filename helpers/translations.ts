import fs from 'fs';
import path from 'path';
import { Translations } from '../types/translations';

const translationsCache: { [key: string]: Translations } = {};

export async function loadTranslations(lang: string): Promise<Translations> {
    if (translationsCache[lang]) {
        return translationsCache[lang];
    }

    const filePath = path.resolve(__dirname, `../locales/${lang}.json`);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const translations = JSON.parse(data);
    translationsCache[lang] = translations;

    return translations;
}