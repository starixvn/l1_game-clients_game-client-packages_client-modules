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
    var configs_1 = require("../configs");
    var Connection = /** @class */ (function () {
        function Connection(game) {
            this.serverUrl = (0, configs_1.getGameServerUrl)(game);
            this.proxyRoute = (0, configs_1.getProxyRoute)(game);
            this.game = game;
        }
        Object.defineProperty(Connection.prototype, "connected", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        return Connection;
    }());
    exports.Connection = Connection;
});
