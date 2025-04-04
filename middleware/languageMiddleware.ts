import { loadTranslations } from '../helpers/translations';

import { NextFunction, Request, Response } from 'express';

const supportedLanguages = ["en", "fr"];

export const languageDetectionMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    const navigatorLang = req.headers["accept-language"]?.split(",")[0];
    req.language = supportedLanguages.find((language) => navigatorLang?.startsWith(language)) || "en";

    next();
};

export const translationMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const lang: string = req.language || 'en';
    const page = req.path.split("/").filter(Boolean).pop() || 'index';

    req.translations = await loadTranslations(lang, page);

    next();
}