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
    exports.getRateConfig = void 0;
    function getRateConfig() {
        var _a;
        return ((_a = window.rateConfig) === null || _a === void 0 ? void 0 : _a.ownRate) || 1;
    }
    exports.getRateConfig = getRateConfig;
});
