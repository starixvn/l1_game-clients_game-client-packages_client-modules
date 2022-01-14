(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../configs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Connection = void 0;
    const configs_1 = require("../configs");
    class Connection {
        constructor(game) {
            this.serverUrl = (0, configs_1.getGameServerUrl)(game);
            this.proxyRoute = (0, configs_1.getProxyRoute)(game);
            this.game = game;
        }
        get connected() {
            return false;
        }
    }
    exports.Connection = Connection;
});
