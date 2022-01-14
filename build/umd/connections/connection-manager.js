(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./socket-io-connection", "../session", "@nex3/user-client"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sso = exports.removeConnection = exports.getConnection = void 0;
    const socket_io_connection_1 = require("./socket-io-connection");
    const session_1 = require("../session");
    const user_client_1 = require("@nex3/user-client");
    const connections = {};
    function getConnection(game) {
        if (!connections[game]) {
            connections[game] = new socket_io_connection_1.SocketIOConnection(game);
        }
        return connections[game];
    }
    exports.getConnection = getConnection;
    function removeConnection(game) {
        const connection = connections[game];
        if (connection) {
            connection.connected && connection.close();
            delete connections[game];
        }
    }
    exports.removeConnection = removeConnection;
    /**
     * Use for testing and development
     * @param userSiteUrl User site url
     * @param token
     */
    async function sso(userSiteUrl, token) {
        if (token) {
            const session = (0, session_1.getSession)();
            const userClient = (0, user_client_1.UserClient)({ serverUrl: userSiteUrl, token: session.session });
            const userInfo = await userClient.sessionManager.sso({ token });
            if (userInfo && userInfo.isAuthenticated) {
                (0, session_1.setSession)(userInfo);
            }
            else {
                (0, session_1.removeSession)();
            }
        }
        async function refreshSession(onError) {
            try {
                const session = (0, session_1.getSession)();
                if (session && session.isAuthenticated) {
                    const userClient = (0, user_client_1.UserClient)({ serverUrl: userSiteUrl, token: session.session });
                    const result = await userClient.sessionManager.updateSessionTimeout({
                        ...session,
                        onError,
                        onUnsuccessful: onError,
                    });
                    if (result && result.isSuccessful) {
                        const newSession = Object.assign({}, session, { expiredIn: result.expiredIn });
                        (0, session_1.setSession)(newSession);
                    }
                }
            }
            catch (error) {
                onError(error);
            }
        }
        const interval = setInterval(() => refreshSession(() => clearInterval(interval)), 60000);
    }
    exports.sso = sso;
});
