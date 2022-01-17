import { SocketIOConnection, getConnection, sso } from "./connections";
import { getSession, setSession, removeSession } from "./session";
export * as mobx from "mobx";
export * as mobxCocos from "mobx-cocos";
export * as configs from "./configs";
export * as languages from "./language";
export declare const connections: {
    SocketIOConnection: typeof SocketIOConnection;
    getConnection: typeof getConnection;
    sso: typeof sso;
    getSession: typeof getSession;
    setSession: typeof setSession;
    removeSession: typeof removeSession;
};
