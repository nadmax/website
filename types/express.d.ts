import { Translations } from './translations'; 
import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            language?: string;
            translations?: Translations;
        }
    }
}