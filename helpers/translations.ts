import fs from 'fs';
import path from 'path';

const translationsCache: { [key: string]: any } = {};

export async function loadTranslations(lang: string): Promise<any> {
    if (translationsCache[lang]) {
        return translationsCache[lang];
    }

    const filePath = path.resolve(__dirname, `../locales/${lang}.json`);
    const data = await fs.promises.readFile(filePath, 'utf-8');
    const translations = JSON.parse(data);
    translationsCache[lang] = translations;

    return translations;
}