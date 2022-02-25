var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./connections", "./session", "mobx", "mobx-cocos", "./configs", "./language"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.connections = exports.languages = exports.configs = exports.mobxCocos = exports.mobx = void 0;
    var connections_1 = require("./connections");
    var session_1 = require("./session");
    exports.mobx = __importStar(require("mobx"));
    exports.mobxCocos = __importStar(require("mobx-cocos"));
    exports.configs = __importStar(require("./configs"));
    exports.languages = __importStar(require("./language"));
    exports.connections = {
        SocketIOConnection: connections_1.SocketIOConnection,
        getConnection: connections_1.getConnection,
        sso: connections_1.sso,
        getSession: session_1.getSession,
        setSession: session_1.setSession,
        removeSession: session_1.removeSession,
    };
});
