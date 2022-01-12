import * as Mobx from "mobx";
import * as MobxCocos from "mobx-cocos";
import { SocketIOConnection, makeConnectionGetter, sso } from "./connections";
import { getSession, setSession, removeSession } from "./session";
import * as Configs from "./configs";
import * as Languages from "./language";

export const legacyModules = {
  mobx: Mobx,
  mobxCocos: MobxCocos,
  connections: {
    Connection: SocketIOConnection,
    getConnection: makeConnectionGetter(),
    getSession,
    setSession,
    removeSession,
    sso,
  },
  configs: Configs,
  languages: Languages,
};

export default legacyModules;
