import { NextFunction, Request, Response } from 'express';

const supportedLanguages = ["en", "fr"];

export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const lang = req.path.split("/")[1];

    if (supportedLanguages.includes(lang)) {
        req.language = lang;
        req.url = req.url.replace(`/${lang}`, "") || "/";
    } else {
        return res.redirect(`/en${req.url}`);
    }

    next();
};