import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

const localStorageLanguage = localStorage.getItem('language');

// Define the namespaces you want to use
const namespaces = ['common', 'map', 'zones'];
const defaultNamespace = 'common';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((language, namespace) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    lng: localStorageLanguage,
    fallbackLng: 'en',
    debug: false,
    ns: namespaces,
    defaultNS: defaultNamespace,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export const changeLanguage = (lng) => {
  localStorage.setItem('language', lng);
  i18n.changeLanguage(lng);
};

export default i18n;
