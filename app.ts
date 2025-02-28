import i18next, { __dirname} from './i18n';
import { setLanguage } from './middleware/setLanguage';

import { handle }  from 'i18next-http-middleware';
import express, { Express, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from "cors";

function readSecret(secretName: string): string | undefined {
    try {
      const secretPath = path.join('/run/secrets', secretName);
      const secretValue = fs.readFileSync(secretPath, 'utf8').trim();

      return secretValue;
    } catch (err) {
      console.error(`Failed to read secret ${secretName}:`, err);

      return undefined;
    }
}

const app: Express = express();
const port: number = 8080;

app.set('view engine', 'pug');

app.use(handle(i18next));
app.use(setLanguage);
app.use(express.static(path.join(__dirname, 'views')));
app.use("/static", express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.urlencoded({
    extended: true
}));
app.use(cors<Request>());

app.get('/', (_req: Request, res: Response) => {
    res.render('index', { page: "index" });
});

app.get('/about', (_req: Request, res: Response) => {
    res.render('about', { page: "about" });
});

app.get('/blog', (_req: Request, res: Response) => {
    res.render('blog/index', { page: "blog_index" });
});

app.get('/blog/linux', (_req: Request, res: Response) => {
    res.render('blog/linux', { page: "linux_article" });
});

app.get('/blog/backup-restore-recovery', (_req: Request, res: Response) => {
    res.render('blog/brr', { page: "brr_article" });
});

app.get('/blog/create-bootable-usb', (_req: Request, res: Response) => {
    res.render('blog/usb', { page: "usb_article" });
});

app.get('/github-repos', async (_req: Request, res: Response) => {
    try {
        const repoNames = ["backup.sh", "restore.sh", "recovery.sh"];
        const repoData = await Promise.all(repoNames.map(async (repo) => {
            const response = await fetch(`https://api.github.com/repos/nadmax/${repo}`, {
                headers: { 
                    Authorization: `token ${readSecret("TOKEN")}` 
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

app.get('/translations/:lng/:page', (req: Request, res: Response) => {
    const { lng, page } = req.params;

    try {
        const translations = require(`./locales/${lng}.json`);

        res.json(translations[page]);
    } catch (error) {
        res.status(404).json({ error: "Language or page not found" });
    }
});

app.listen(port, () => {
    console.log(`🚀 App starting on http://localhost:${port}`);
});