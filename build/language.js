(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./session", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setLanguage = exports.getDefaultLanguage = exports.getLanguage = exports.getLanguages = exports.isLanguageSupported = void 0;
    var session_1 = require("./session");
    var utils_1 = require("./utils");
    var defaultLanguage = "en-US";
    function isLanguageSupported(language) {
        var languages = getLanguages();
        return language && languages.filter(function (lang) { return lang.code === language; }).length !== 0;
    }
    exports.isLanguageSupported = isLanguageSupported;
    function getLanguages() {
        var _a;
        return ((_a = window.globalConfigs) === null || _a === void 0 ? void 0 : _a.supportedLanguages) || [];
    }
    exports.getLanguages = getLanguages;
    function getLanguage() {
        var session = (0, session_1.getSession)();
        var isLanguageValid = isLanguageSupported(session === null || session === void 0 ? void 0 : session.language);
        return isLanguageValid ? session.language : getDefaultLanguage();
    }
    exports.getLanguage = getLanguage;
    function getDefaultLanguage() {
        var _a;
        return ((_a = window.globalConfigs) === null || _a === void 0 ? void 0 : _a.defaultLanguage) || defaultLanguage;
    }
    exports.getDefaultLanguage = getDefaultLanguage;
    function setLanguage(language) {
        var session = (0, session_1.getSession)();
        var isLanguageValid = isLanguageSupported(language);
        var validatedLanguage = isLanguageValid ? language : getDefaultLanguage();
        var i18n = (0, utils_1.getI18NInstance)();
        session.language = validatedLanguage;
        (0, session_1.setSession)(session);
        i18n.init(validatedLanguage);
        i18n.updateSceneRenderers();
    }
    exports.setLanguage = setLanguage;
});
