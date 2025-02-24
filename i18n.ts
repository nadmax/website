import i18next from 'i18next';
import FsBackend, { FsBackendOptions }  from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';

export const __dirname = path.resolve();
const localesPath = path.join(__dirname, "locales");

i18next
  .use(FsBackend)
  .use(LanguageDetector)
  .init<FsBackendOptions>({
    backend: {
      loadPath: path.join(localesPath, '{{lng}}.json'),
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
});

export default i18next;