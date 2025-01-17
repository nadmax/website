import i18next from 'i18next';
import FsBackend, { FsBackendOptions }  from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import path from 'path';

export const __dirname = path.resolve();

i18next
  .use(FsBackend)
  .use(LanguageDetector)
  .init<FsBackendOptions>({
    backend: {
      loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json'),
    },
    ns: ['index'],
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
    fallbackLng: 'en',
    preload: ['en', 'fr'],
});

export default i18next;