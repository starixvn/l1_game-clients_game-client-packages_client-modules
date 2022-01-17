var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
    var socket_io_client_1 = __importDefault(require("socket.io-client"));
    var session_1 = require("../session");
    var connection_1 = require("./connection");
    var connection_manager_1 = require("./connection-manager");
    var SocketIOConnection = /** @class */ (function (_super) {
        __extends(SocketIOConnection, _super);
        function SocketIOConnection(game) {
            var _this = _super.call(this, game) || this;
            var options = {
                transports: ["websocket"],
                upgrade: false,
                path: _this.proxyRoute,
                forceNew: true,
            };
            _this.socket = (0, socket_io_client_1.default)(_this.serverUrl, options);
            _this.registerEvents();
            return _this;
        }
        SocketIOConnection.prototype.onConnectFailed = function () {
            (0, connection_manager_1.removeConnection)(this.game);
        };
        SocketIOConnection.prototype.onConnect = function () {
            var signInEvent = "signin";
            this.emit(signInEvent, (0, session_1.getSession)());
        };
        SocketIOConnection.prototype.onDisconnect = function () {
            (0, connection_manager_1.removeConnection)(this.game);
        };
        Object.defineProperty(SocketIOConnection.prototype, "connected", {
            get: function () {
                return this.socket.connected;
            },
            enumerable: false,
            configurable: true
        });
        SocketIOConnection.prototype.close = function () {
            this.socket && this.socket.disconnect();
        };
        SocketIOConnection.prototype.on = function (eventName, eventHandler) {
            this.socket.on(eventName, eventHandler);
        };
        SocketIOConnection.prototype.once = function (eventName, eventHandler) {
            this.socket.once(eventName, eventHandler);
        };
        SocketIOConnection.prototype.removeListener = function (eventName, handler) {
            this.socket.removeListener(eventName, handler);
        };
        SocketIOConnection.prototype.emit = function (eventName) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args.length) {
                (_a = this.socket).emit.apply(_a, __spreadArray([eventName], args, false));
            }
            else {
                this.socket.emit(eventName);
            }
        };
        SocketIOConnection.prototype.registerEvents = function () {
            var connectEvent = "connect";
            var disconnectEvent = "disconnect";
            var connectFailedEvent = "connect_failed";
            var connectErrorEvent = "connect_error";
            this.on(connectEvent, this.onConnect.bind(this));
            this.on(connectFailedEvent, this.onConnectFailed.bind(this));
            this.on(connectErrorEvent, this.onConnectFailed.bind(this));
            this.on(disconnectEvent, this.onDisconnect.bind(this));
        };
        return SocketIOConnection;
    }(connection_1.Connection));
    exports.SocketIOConnection = SocketIOConnection;
});
