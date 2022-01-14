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
    const sessionKey = `${window.location.hostname}.scss`;
    function getSession() {
        return JSON.parse(localStorage.getItem(sessionKey) || "{}");
    }
    exports.getSession = getSession;
    function setSession(session) {
        session.ss = session.session;
        localStorage.setItem(sessionKey, JSON.stringify(session));
    }
    exports.setSession = setSession;
    function removeSession() {
        localStorage.removeItem(sessionKey);
    }
    exports.removeSession = removeSession;
});
