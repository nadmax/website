import { loadTranslations } from '../helpers/translations';

import { NextFunction, Request, Response } from 'express';

const supportedLanguages = ["en", "fr"];

export const languageDetectionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const navigatorLang = req.headers["accept-language"]?.split(",")[0];
    req.language = supportedLanguages.find((language) => navigatorLang?.startsWith(language)) || "en";

    next();
};

export const translationMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const lang = req.language || 'en';
    req.translations = await loadTranslations(lang);

    next();
}