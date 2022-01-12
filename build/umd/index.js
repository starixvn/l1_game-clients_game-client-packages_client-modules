(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mobx", "mobx-cocos", "./connections", "./session", "./configs", "./language"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.legacyModules = void 0;
    const Mobx = require("mobx");
    const MobxCocos = require("mobx-cocos");
    const connections_1 = require("./connections");
    const session_1 = require("./session");
    const Configs = require("./configs");
    const Languages = require("./language");
    exports.legacyModules = {
        mobx: Mobx,
        mobxCocos: MobxCocos,
        connections: {
            Connection: connections_1.SocketIOConnection,
            getConnection: connections_1.makeConnectionGetter(),
            getSession: session_1.getSession,
            setSession: session_1.setSession,
            removeSession: session_1.removeSession,
            sso: connections_1.sso,
        },
        configs: Configs,
        languages: Languages,
    };
    exports.default = exports.legacyModules;
});
