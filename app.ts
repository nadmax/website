import i18next, { __dirname } from './i18n';
import { setLanguage } from './middleware/setLanguage';

import { handle }  from 'i18next-http-middleware';
import express, { Express, Request, Response } from 'express';
import { WebSocketServer } from "ws";
import chokidar from "chokidar";
import path from 'path';
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: number = 5000;
const TOKEN = process.env.TOKEN;

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
        contact: req.t('contact')
    });
});
app.get('/about', (req: Request, res: Response) => {
    res.render('about', {
        aboutLink: req.t('about_link'),
        autobiographyTitle: req.t('autobiography_title'),
        autobiography: req.t('autobiography')
    });
});
app.get('/blog', (req: Request, res: Response) => {
    res.render('blog/index', {
        aboutLink: req.t('about_link'),
        freelanceTitle: req.t('freelance_title'),
        linuxTitle: req.t('linux_title'),
        brrTitle: req.t('brr_title'),
        usbTitle: req.t('usb_title')
    });
});
app.get('/blog/freelance', (req: Request, res: Response) => {
    res.render('blog/freelance', {
        aboutLink: req.t('about_link'),
        freelanceTitle: req.t('freelance_title')
    });
});
app.get('/blog/linux', (req: Request, res: Response) => {
    res.render('blog/linux', {
        aboutLink: req.t('about_link'),
        linuxTitle: req.t('linux_title'),
        linux: req.t('linux'),
        linuxSystemTitle: req.t('linux_system_title'),
        linuxSystem: req.t('linux_system'),
        conclusionTitle: req.t('conclusion_title'),
        linuxConclusion: req.t('linux_conclusion')
    });
});
app.get('/blog/backup-restore-recovery', (req: Request, res: Response) => {
    res.render('blog/brr', {
        aboutLink: req.t('about_link'),
        brrTitle: req.t('brr_title'),
        brrIntroduction: req.t('brr_introduction'),
        backupTitle: req.t('backup_title'),
        backup: req.t('backup'),
        restoreTitle: req.t('restore_title'),
        restore: req.t('restore'),
        recoveryTitle: req.t('recovery_title'),
        recovery: req.t('recovery'),
        brrConclusion: req.t('brr_conclusion'),
        brrProjects: req.t('brr_projects'),
        brrEnd: req.t('brr_end')
    });
});
app.get('/blog/create-bootable-usb', (req: Request, res: Response) => {
    res.render('blog/usb', {
        aboutLink: req.t('about_link'),
        usbTitle: req.t('usb_title'),
        usb: req.t('usb'),
        usbConclusion: req.t('usb_conclusion')
    })
});

app.get('/github-repos', async (req: Request, res: Response) => {
    try {
        const repoNames = ["backup.sh", "restore.sh", "recovery.sh"];
        const repoData = await Promise.all(repoNames.map(async (repo) => {
            const response = await fetch(`https://api.github.com/repos/nadmax/${repo}`, {
                headers: { 
                    Authorization: `token ${TOKEN}` 
                }
            });

            return response.json();
        }));

        res.json(repoData);
    } catch (error) {
        res.status(500).json({ 
            error: "Error fetching data"
        });
    }
});

app.post('/lang', (req: Request, res: Response) => {
    const lang = req.body.lng;
    const redirectPath = req.get('Referer') || '/';

    res.cookie('i18next', lang);
    res.redirect(redirectPath);
});

const server = app.listen(port, () => {
    console.log(`🚀 App starting on http://localhost:${port}`);
});
const wss = new WebSocketServer({ server });

wss.on("connection", () => {
    console.log("Client connected");
});
chokidar
    .watch(".", {ignored: /node_modules/ })
    .on("change", () => {
        wss.clients.forEach((client) => client.send("reload"));
});