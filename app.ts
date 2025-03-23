import { languageMiddleware } from './middleware/languageMiddleware';
import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import fs from 'fs';
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
app.use(express.static(path.join(__dirname, 'public')));
app.use("/locales", express.static(path.join(__dirname, 'locales')));
app.use(express.urlencoded({
    extended: true
}));

app.get('/', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));

    res.render('index', { 
        language: lang,
        translations,
    });
});

app.get('/appointment', (_req: Request, res: Response) => {
    res.redirect('https://calendly.com/maximiliennadji/30min');
})

app.get('/about', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));

    res.render('about', { 
        language: lang,
        translations,
    });
});

app.get('/blog', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = require(`./locales/${lang}.json`);

    res.render('blog/index', { 
        language: lang,
        translations,
    });
});

app.get('/blog/linux', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));
    
    res.render('blog/linux', { 
        language: lang,
        translations, 
    });
});

app.get('/blog/git', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));
    
    res.render('blog/git', { 
        language: lang,
        translations, 
    });
});

app.get('/blog/bootable-usb', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));
    
    res.render('blog/usb', { 
        language: lang,
        translations,
    });
});

app.get('/blog/backup-restore-recovery', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));

    res.render('blog/brr', { 
        language: lang,
        translations, 
    });
});

app.get('/blog/user-group-file-permissions', async (req: Request, res: Response) => {
    const lang = req.language;
    const translations = await fs.promises.readFile(`./locales/${lang}.json`, 'utf-8')
        .then(data => JSON.parse(data));

    res.render('blog/users', { 
        language: lang,
        translations, 
    });
});

app.listen(port, () => {
    console.log(`🚀 App starting on http://localhost:${port}`);
});