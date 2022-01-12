import * as Mobx from "mobx";
import * as MobxCocos from "mobx-cocos";
import { SocketIOConnection, sso } from "./connections";
import { getSession, setSession, removeSession } from "./session";
import * as Configs from "./configs";
import * as Languages from "./language";
export declare const legacyModules: {
    mobx: typeof Mobx;
    mobxCocos: typeof MobxCocos;
    connections: {
        Connection: typeof SocketIOConnection;
        getConnection: (game: string) => import("./connections").Connection;
        getSession: typeof getSession;
        setSession: typeof setSession;
        removeSession: typeof removeSession;
        sso: typeof sso;
    };
    configs: typeof Configs;
    languages: typeof Languages;
};
export default legacyModules;
