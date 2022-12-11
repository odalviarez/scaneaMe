import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// ruta a los archivos de idiomas
import common_en from "../src/translation/en/global.json"
import common_es from "../src/translation/es/global.json"

i18n.use(LanguageDetector).init({
  fallbackLng: "es",
  debug: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  // react i18next special options (optional)
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
  },
  resources: {
    en: {
      translation: common_en,
    },
    es: {
      translation: common_es,
    },
  },
})
export default i18n