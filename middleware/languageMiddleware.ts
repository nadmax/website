import { loadTranslations } from '../helpers/translations';

import { NextFunction, Request, Response } from 'express';

const supportedLanguages = ["en", "fr"];

export const languageDetectionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const lang = req.path.split("/")[1];

    if (supportedLanguages.includes(lang)) {
        req.language = lang;
        req.url = req.url.replace(`/${lang}`, "") || "/";
    } else {
        const navigatorLang = req.headers["accept-language"]?.split(",")[0];
        const preferredLang = supportedLanguages.find((language) => navigatorLang?.startsWith(language)) || "en";

        return res.redirect(`/${preferredLang}${req.url}`);
    }

    next();
};

export const translationMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
    const lang = req.language || 'en';
    req.translations = await loadTranslations(lang);

    next();
}