import i18next, { __dirname } from './i18n';
import { setLanguage } from './middleware/setLanguage';

import { handle }  from 'i18next-http-middleware';
import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const port: number = 5000;

app.set('view engine', 'pug');

app.use(handle(i18next));
app.use(setLanguage);
app.use(express.static(path.join(__dirname, 'views')));
app.use("/static", express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req: Request, res: Response) => {
    res.render('index', {
        aboutLink: req.t('about_link'),
        aboutTitle: req.t('about_title'),
        shortAutobiography : req.t('short_autobiography'),
        goals: req.t('goals'),
        usersAndGroups: req.t('users_and_groups'),
        cronjobs: req.t('cronjobs'),
        storage: req.t('storage'),
        systemFailures: req.t('system_failures'),
        networking: req.t('networking'),
        loadBalancing: req.t('load_balancing'),
        deployment: req.t('deployment'),
        containers: req.t('containers'),
        contactTitle: req.t('contact_title'),
        contact: req.t('contact'),
    });
});
app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        aboutLink: req.t('about_link'),
        autobiographyTitle: req.t('autobiography_title'),
        autobiography: req.t('autobiography')
    });
})
app.post('/lang', (req: Request, res: Response) => {
    const lang = req.body.lng;
    const redirectPath = req.get('Referer') || '/';

    res.cookie('i18next', lang);
    res.redirect(redirectPath);
});

app.listen(port, () => {
    console.log(`App starting on http://localhost:${port}`);
});