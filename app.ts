import { languageDetectionMiddleware, translationMiddleware } from './middleware/languageMiddleware';

import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import nocache from 'nocache';
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
app.use(nocache());
app.use(languageDetectionMiddleware);
app.use(translationMiddleware);
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
    res.status(200).render('index', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/appointment', (_req: Request, res: Response) => {
    res.redirect('https://calendly.com/maximiliennadji/30min');
})

app.get('/about', async (req: Request, res: Response) => {
    res.render('about', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/blog/', async (req: Request, res: Response) => {
    res.render('blog/index', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/blog/linux', async (req: Request, res: Response) => {
    res.render('blog/linux', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/blog/git', async (req: Request, res: Response) => {
    res.render('blog/git', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/blog/usb', async (req: Request, res: Response) => {
    res.render('blog/usb', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/blog/brr', async (req: Request, res: Response) => {
    res.render('blog/brr', { 
        language: req.language,
        translations: req.translations,
    });
});

app.get('/blog/users', async (req: Request, res: Response) => {
    res.render('blog/users', { 
        language: req.language,
        translations: req.translations,
    });
});

export default app;

if (require.main === module) {
    app.listen(port, () => {
        console.log(`🚀 App starting on http://localhost:${port}`);
    });
}