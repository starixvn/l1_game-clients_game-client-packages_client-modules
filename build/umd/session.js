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
    exports.removeSession = exports.setSession = exports.getSession = void 0;
    const SESSION_KEY = "session";
    function getSession() {
        return localStorage.getItem(SESSION_KEY) || "";
    }
    exports.getSession = getSession;
    function setSession(session) {
        localStorage.setItem(SESSION_KEY, session);
    }
    exports.setSession = setSession;
    function removeSession() {
        localStorage.removeItem(SESSION_KEY);
    }
    exports.removeSession = removeSession;
});
