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
    exports.getGameUserUrl = exports.getProxyRoute = exports.getGameServerUrl = exports.getGameConfigs = exports.getEnvironmentConfigs = exports.getRateConfig = void 0;
    function getRateConfig() {
        var _a;
        return ((_a = window.rateConfig) === null || _a === void 0 ? void 0 : _a.ownRate) || 1;
    }
    exports.getRateConfig = getRateConfig;
    function getEnvironmentConfigs() {
        var _a;
        var defaultEnvironment = {
            gameUserUrl: "",
            hostName: "",
            ssl: false,
            subpath: "",
        };
        return ((_a = window.globalConfigs) === null || _a === void 0 ? void 0 : _a.environment) || defaultEnvironment;
    }
    exports.getEnvironmentConfigs = getEnvironmentConfigs;
    function getGameConfigs(game) {
        var _a;
        return (_a = window.globalConfigs) === null || _a === void 0 ? void 0 : _a.games[game];
    }
    exports.getGameConfigs = getGameConfigs;
    function getGameServerUrl(game) {
        var _a = getEnvironmentConfigs(), hostName = _a.hostName, ssl = _a.ssl;
        var protocol = ssl ? "https" : "http";
        var namespace = (getGameConfigs(game) || { namespace: "" }).namespace;
        return "".concat(protocol, "://").concat(hostName).concat(namespace);
    }
    exports.getGameServerUrl = getGameServerUrl;
    function getProxyRoute(game) {
        var subpath = getEnvironmentConfigs().subpath;
        var proxyRoute = getGameConfigs(game).proxyRoute;
        return "".concat(subpath).concat(proxyRoute);
    }
    exports.getProxyRoute = getProxyRoute;
    function getGameUserUrl() {
        return getEnvironmentConfigs().gameUserUrl;
    }
    exports.getGameUserUrl = getGameUserUrl;
});
