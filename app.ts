import i18next, { __dirname} from './i18n';
import { languageMiddleware } from './middleware/languageMiddleware';

import { handle }  from 'i18next-http-middleware';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from "cors";
import { error } from 'console';

const app: Express = express();
const port: number = 8080;

app.set('view engine', 'pug');

app.use(handle(i18next));
app.use(languageMiddleware);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use("/static", express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use("/locales", express.static(path.join(__dirname, 'locales')));
app.use(express.urlencoded({
    extended: true
}));
app.use(cors<Request>());

app.get('/', (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);

    res.render('index', { 
        page: "index",
        language: lang,
        translations,
    });
});

app.get('/about', (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);

    res.render('about', { 
        page: "about_page",
        language: lang,
        translations,
    });
});

app.get('/blog', (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);

    res.render('blog/index', { 
        page: "blog_index",
        language: lang,
        translations,
    });
});

app.get('/blog/linux', (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);
    
    res.render('blog/linux', { 
        page: "linux_article",
        language: lang,
        translations, 
    });
});

app.get('/blog/backup-restore-recovery', (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);

    res.render('blog/brr', { 
        page: "brr_article",
        language: lang,
        translations, 
    });
});

app.get('/blog/create-bootable-usb', (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);

    res.render('blog/usb', { 
        page: "usb_article",
        language: lang,
        translations,
    });
});

app.listen(port, () => {
    console.log(`🚀 App starting on http://localhost:${port}`);
});