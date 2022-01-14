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
        define(["require", "exports", "socket.io-client", "../session", "./connection", "./connection-manager"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SocketIOConnection = void 0;
    const SocketIOClient = __importStar(require("socket.io-client"));
    const session_1 = require("../session");
    const connection_1 = require("./connection");
    const connection_manager_1 = require("./connection-manager");
    class SocketIOConnection extends connection_1.Connection {
        constructor(game) {
            super(game);
            const options = {
                transports: ["websocket"],
                upgrade: false,
                path: this.proxyRoute,
                forceNew: true,
            };
            this.socket = SocketIOClient(this.serverUrl, options);
            this.registerEvents();
        }
        onConnectFailed() {
            (0, connection_manager_1.removeConnection)(this.game);
        }
        onConnect() {
            const signInEvent = "signin";
            this.emit(signInEvent, (0, session_1.getSession)());
        }
        onDisconnect() {
            (0, connection_manager_1.removeConnection)(this.game);
        }
        get connected() {
            return this.socket.connected;
        }
        close() {
            this.socket && this.socket.disconnect();
        }
        on(eventName, eventHandler) {
            this.socket.on(eventName, eventHandler);
        }
        once(eventName, eventHandler) {
            this.socket.once(eventName, eventHandler);
        }
        removeListener(eventName, handler) {
            this.socket.removeListener(eventName, handler);
        }
        emit(eventName, ...args) {
            if (args.length) {
                this.socket.emit(eventName, ...args);
            }
            else {
                this.socket.emit(eventName);
            }
        }
        registerEvents() {
            const connectEvent = "connect";
            const disconnectEvent = "disconnect";
            const connectFailedEvent = "connect_failed";
            const connectErrorEvent = "connect_error";
            this.on(connectEvent, this.onConnect.bind(this));
            this.on(connectFailedEvent, this.onConnectFailed.bind(this));
            this.on(connectErrorEvent, this.onConnectFailed.bind(this));
            this.on(disconnectEvent, this.onDisconnect.bind(this));
        }
    }
    exports.SocketIOConnection = SocketIOConnection;
});
