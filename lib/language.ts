const i18n = require("LanguageData");
const LANGUAGE_KEY = "language";
const DEFAULT_LANGUAGE = "en-US";

declare global {
  export interface Window {
    language: string;
  }
}

export function isLanguageSupported(language: string) {
  const languages = getLanguages();

  return language && languages.filter((name) => name == language).length != 0;
}

export function getLanguages() {
  return ["en-US", "id-ID", "th-TH"];
}

export function getLanguage() {
  const currentLanguage = localStorage.getItem(LANGUAGE_KEY);
  const isLanguageValid = isLanguageSupported(currentLanguage);

  return isLanguageValid ? currentLanguage : getDefaultLanguage();
}

export function getDefaultLanguage() {
  return DEFAULT_LANGUAGE;
}

export function setLanguage(language: string) {
  const isLanguageValid = isLanguageSupported(language);
  const validatedLanguage = isLanguageValid ? language : getLanguage();

  localStorage.setItem(LANGUAGE_KEY, validatedLanguage);

  i18n.init(validatedLanguage);
  i18n.updateSceneRenderers();
}
