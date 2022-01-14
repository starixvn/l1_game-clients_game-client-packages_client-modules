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
        const defaultEnvironment = {
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
        const { hostName, ssl } = getEnvironmentConfigs();
        const protocol = ssl ? "https" : "http";
        const { namespace } = getGameConfigs(game) || { namespace: "" };
        return `${protocol}://${hostName}${namespace}`;
    }
    exports.getGameServerUrl = getGameServerUrl;
    function getProxyRoute(game) {
        const { subpath } = getEnvironmentConfigs();
        const { proxyRoute } = getGameConfigs(game);
        return `${subpath}${proxyRoute}`;
    }
    exports.getProxyRoute = getProxyRoute;
    function getGameUserUrl() {
        return getEnvironmentConfigs().gameUserUrl;
    }
    exports.getGameUserUrl = getGameUserUrl;
});
