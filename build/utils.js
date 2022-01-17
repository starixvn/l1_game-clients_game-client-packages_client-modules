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
    exports.getI18NInstance = void 0;
    function getI18NInstance() {
        return require("LanguageData"); // NOSONAR
    }
    exports.getI18NInstance = getI18NInstance;
});
