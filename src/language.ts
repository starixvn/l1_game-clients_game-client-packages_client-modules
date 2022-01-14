import { getSession, setSession } from "./session";

const i18n = require("LanguageData"); // NOSONAR
const defaultLanguage = "en-US";

declare global {
  interface GlobalConfigs {
    supportedLanguages?: { code: string; text: string }[];
    defaultLanguage?: string;
  }
  export interface Window {
    language: string;
    globalConfigs: GlobalConfigs;
  }
}

export function isLanguageSupported(language: string) {
  const languages = getLanguages();

  return language && languages.filter((lang) => lang.code === language).length !== 0;
}

export function getLanguages() {
  return window.globalConfigs?.supportedLanguages || [];
}

export function getLanguage() {
  const session = getSession();
  const isLanguageValid = isLanguageSupported(session?.language);

  return isLanguageValid ? session.language : getDefaultLanguage();
}

export function getDefaultLanguage() {
  return window.globalConfigs?.defaultLanguage || defaultLanguage;
}

export function setLanguage(language: string) {
  const session = getSession();
  const isLanguageValid = isLanguageSupported(language);
  const validatedLanguage = isLanguageValid ? language : getDefaultLanguage();

  session.language = validatedLanguage;

  setSession(session);
  i18n.init(validatedLanguage);
  i18n.updateSceneRenderers();
}
