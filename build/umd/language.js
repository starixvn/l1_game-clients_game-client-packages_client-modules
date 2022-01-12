(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setLanguage = exports.getDefaultLanguage = exports.getLanguage = exports.getLanguages = exports.isLanguageSupported = void 0;
    const i18n = require("LanguageData");
    const LANGUAGE_KEY = "language";
    const DEFAULT_LANGUAGE = "en-US";
    function isLanguageSupported(language) {
        const languages = getLanguages();
        return language && languages.filter((name) => name == language).length != 0;
    }
    exports.isLanguageSupported = isLanguageSupported;
    function getLanguages() {
        return ["en-US", "id-ID", "th-TH"];
    }
    exports.getLanguages = getLanguages;
    function getLanguage() {
        const currentLanguage = localStorage.getItem(LANGUAGE_KEY);
        const isLanguageValid = isLanguageSupported(currentLanguage);
        return isLanguageValid ? currentLanguage : getDefaultLanguage();
    }
    exports.getLanguage = getLanguage;
    function getDefaultLanguage() {
        return DEFAULT_LANGUAGE;
    }
    exports.getDefaultLanguage = getDefaultLanguage;
    function setLanguage(language) {
        const isLanguageValid = isLanguageSupported(language);
        const validatedLanguage = isLanguageValid ? language : getLanguage();
        localStorage.setItem(LANGUAGE_KEY, validatedLanguage);
        i18n.init(validatedLanguage);
        i18n.updateSceneRenderers();
    }
    exports.setLanguage = setLanguage;
});
