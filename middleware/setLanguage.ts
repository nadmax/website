import { NextFunction, Request, Response } from 'express';

export const setLanguage = (req: Request, res: Response, next: NextFunction) => {
    res.locals.lng = req.language;
    next();
};