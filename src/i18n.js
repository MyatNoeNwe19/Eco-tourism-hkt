import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 6 B A S E L A N G U A G E S
import myTranslation from './locales/my/translation.json'; 
import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';
import viTranslation from './locales/vi/translation.json';
import koTranslation from './locales/ko/translation.json';

const resources = {
  en: { translation: enTranslation },
  my: { translation: myTranslation },
  ja: { translation: jaTranslation },
  vi: { translation: viTranslation },
  ko: { translation: koTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // Default language
    fallbackLng: 'en', // Fallback to English
    interpolation: {
      escapeValue: false,
    },
    // Optional: for development
    debug: true,
    returnObjects: true
  });

export default i18n;