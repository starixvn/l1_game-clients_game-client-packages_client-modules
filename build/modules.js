/*!
 * Nex3 Client Modules v1.0.7
 */
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  (function (factory) {
    if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
      var v = factory(require, exports);
      if (v !== undefined) module.exports = v;
    } else if (typeof define === "function" && define.amd) {
      define(["require", "exports", "mobx", "mobx-cocos", "./connections", "./session", "./configs", "./language"], factory);
    }
  })(function (require, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.legacyModules = void 0;

    var Mobx = require("mobx");

    var MobxCocos = require("mobx-cocos");

    var connections_1 = require("./connections");

    var session_1 = require("./session");

    var Configs = require("./configs");

    var Languages = require("./language");

    exports.legacyModules = {
      mobx: Mobx,
      mobxCocos: MobxCocos,
      connections: {
        Connection: connections_1.SocketIOConnection,
        getConnection: connections_1.makeConnectionGetter(),
        getSession: session_1.getSession,
        setSession: session_1.setSession,
        removeSession: session_1.removeSession,
        sso: connections_1.sso
      },
      configs: Configs,
      languages: Languages
    };
    exports["default"] = exports.legacyModules;
  });

}));
//# sourceMappingURL=modules.js.map
