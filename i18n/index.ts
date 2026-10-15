import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translations/en.json";
import es from "./translations/es.json";

const STORAGE_KEY = "@user-language";

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);

  if (!savedLanguage) {
    const deviceLanguage = getLocales()[0]?.languageCode ?? "es";
    savedLanguage = deviceLanguage.startsWith("en") ? "en" : "es";
  }

  i18n.use(initReactI18next).init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: savedLanguage,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
