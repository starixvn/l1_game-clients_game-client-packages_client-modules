(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "socket.io-client", "./session", "@nex3/user-client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sso = exports.makeConnectionGetter = exports.SocketIOConnection = void 0;
    const SocketIOClient = require("socket.io-client");
    const session_1 = require("./session");
    const user_client_1 = require("@nex3/user-client");
    class SocketIOConnection {
        constructor(options) {
            this.socket = SocketIOClient(options.socketUri, {
                transports: ["websocket"],
                upgrade: false,
                path: options.proxyRoute,
                forceNew: true,
            });
            this.gameName = options.gameName;
            this.onConnectFailed = options.onConnectFailed || (() => ({}));
            this.registerEvents();
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
        get connected() {
            return this.socket.connected;
        }
        registerEvents() {
            const connectEvent = "connect";
            const signInEvent = "signin";
            const connectFailedEvent = "connect_failed";
            const connectErrorEvent = "connect_error";
            this.on(connectEvent, () => {
                this.emit(signInEvent, { ss: session_1.getSession() });
            });
            this.on(connectFailedEvent, this.onConnectionInterrupt.bind(this));
            this.on(connectErrorEvent, this.onConnectionInterrupt.bind(this));
        }
        onConnectionInterrupt() {
            this.socket.disconnect();
            this.onConnectFailed(this.gameName);
        }
    }
    exports.SocketIOConnection = SocketIOConnection;
    function makeConnectionGetter() {
        const connections = {};
        const configs = {
            RongHo: {
                gameName: "RongHo",
                proxyRoute: "/local1/dragontiger/socket.io",
                socketUri: "http://l3-api-proxy.nexdev.net/user/rongho",
                onConnectFailed: () => {
                    console.error("Connection failed");
                    connections["RongHo"] = null;
                },
            },
        };
        return function (game) {
            if (!connections[game]) {
                connections[game] = new SocketIOConnection(configs[game]);
            }
            return connections[game];
        };
    }
    exports.makeConnectionGetter = makeConnectionGetter;
    async function sso(url, token) {
        if (!token) {
            return false;
        }
        const session = session_1.getSession() || "";
        const userClient = user_client_1.UserClient({
            serverUrl: url,
            token: session,
        });
        const userInfo = await userClient.sessionManager.sso({ token });
        if (userInfo && userInfo.isAuthenticated) {
            session_1.setSession(userInfo.session);
            return true;
        }
        else {
            session_1.removeSession();
            return false;
        }
    }
    exports.sso = sso;
});
