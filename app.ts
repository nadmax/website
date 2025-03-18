import { languageMiddleware } from './middleware/languageMiddleware';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import path from 'path';

const app: Express = express();
const port: number = 8080;
const __dirname = path.resolve();

app.use(compression({
    level: 6,
    threshold: 0,
    filter: (req: Request, res: Response) => {
        return req.headers['x-no-compression'] ? false : compression.filter(req, res);
    }
}));

app.set('view engine', 'pug');

app.use(languageMiddleware);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use("/static", express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use("/locales", express.static(path.join(__dirname, 'locales')));
app.use(express.urlencoded({
    extended: true
}));

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

app.get('/blog/bootable-usb', (req: Request, res: Response) => {
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