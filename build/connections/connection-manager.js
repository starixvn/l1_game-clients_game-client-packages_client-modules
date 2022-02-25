var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    exports.sso = exports.refreshSession = exports.removeConnection = exports.getConnection = void 0;
    var socket_io_connection_1 = require("./socket-io-connection");
    var session_1 = require("../session");
    var user_client_1 = require("@nex3/user-client");
    var connections = {};
    function getConnection(game) {
        if (!connections[game]) {
            connections[game] = new socket_io_connection_1.SocketIOConnection(game);
        }
        return connections[game];
    }
    exports.getConnection = getConnection;
    function removeConnection(game) {
        var connection = connections[game];
        if (connection) {
            connection.connected && connection.close();
            delete connections[game];
        }
    }
    exports.removeConnection = removeConnection;
    /**
     * Use for testing and development
     */
    function refreshSession(userSiteUrl, onError) {
        return __awaiter(this, void 0, void 0, function () {
            var session, userClient, result, newSession, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        session = (0, session_1.getSession)();
                        if (!(session === null || session === void 0 ? void 0 : session.isAuthenticated)) return [3 /*break*/, 2];
                        userClient = (0, user_client_1.UserClient)({ serverUrl: userSiteUrl, token: session.session });
                        return [4 /*yield*/, userClient.sessionManager.updateSessionTimeout(__assign(__assign({}, session), { onError: onError, onUnsuccessful: onError }))];
                    case 1:
                        result = _a.sent();
                        if (result && result.isSuccessful) {
                            newSession = Object.assign({}, session, { expiredIn: result.expiredIn });
                            (0, session_1.setSession)(newSession);
                        }
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        onError(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    exports.refreshSession = refreshSession;
    /**
     * Use for testing and development
     * @param userSiteUrl User site url
     * @param token
     */
    function sso(userSiteUrl, token) {
        return __awaiter(this, void 0, void 0, function () {
            var session, userClient, userInfo, interval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) return [3 /*break*/, 2];
                        session = (0, session_1.getSession)();
                        userClient = (0, user_client_1.UserClient)({ serverUrl: userSiteUrl, token: session.session });
                        return [4 /*yield*/, userClient.sessionManager.sso({ token: token })];
                    case 1:
                        userInfo = _a.sent();
                        if (userInfo === null || userInfo === void 0 ? void 0 : userInfo.isAuthenticated) {
                            (0, session_1.setSession)(userInfo);
                        }
                        else {
                            (0, session_1.removeSession)();
                        }
                        _a.label = 2;
                    case 2:
                        interval = setInterval(function () { return refreshSession(userSiteUrl, function () { return clearInterval(interval); }); }, 60000);
                        return [2 /*return*/];
                }
            });
        });
    }
    exports.sso = sso;
});
