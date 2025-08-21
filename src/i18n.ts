import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import urTranslation from './locales/ur/translation.json'; // Import Urdu translation

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      es: {
        translation: esTranslation
      },
      ur: { // Add Urdu resources
        translation: urTranslation
      }
    },
    fallbackLng: "en", // Fallback language if user language is not available
    debug: true, // Enable debug mode for development
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;