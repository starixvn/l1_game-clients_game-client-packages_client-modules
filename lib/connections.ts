import * as SocketIOClient from "socket.io-client";
import { getSession, removeSession, setSession } from "./session";
import { UserClient } from "@nex3/user-client";

export interface Connection {
  emit(eventName: string, ...args: any[]): void;
  on(eventName: string, eventHandler: Function): void;
  once(eventName: string, eventHandler: Function): void;
}

export interface SocketIOConnectionOptions {
  onConnectFailed(game: string): void;
  gameName: string;
  socketUri: string;
  proxyRoute: string;
}

export class SocketIOConnection implements Connection {
  private readonly socket: SocketIOClient.Socket;
  private readonly gameName: string;
  private readonly onConnectFailed: Function;

  constructor(options: SocketIOConnectionOptions) {
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

  on(eventName: string, eventHandler: Function) {
    this.socket.on(eventName, eventHandler);
  }

  once(eventName: string, eventHandler: Function) {
    this.socket.once(eventName, eventHandler);
  }

  removeListener(eventName: string, handler?: Function) {
    this.socket.removeListener(eventName, handler);
  }

  emit(eventName: string, ...args: any[]) {
    if (args.length) {
      this.socket.emit(eventName, ...args);
    } else {
      this.socket.emit(eventName);
    }
  }

  public get connected(): boolean {
    return this.socket.connected;
  }

  private registerEvents() {
    const connectEvent = "connect";
    const signInEvent = "signin";
    const connectFailedEvent = "connect_failed";
    const connectErrorEvent = "connect_error";

    this.on(connectEvent, () => {
      this.emit(signInEvent, { ss: getSession() });
    });

    this.on(connectFailedEvent, this.onConnectionInterrupt.bind(this));
    this.on(connectErrorEvent, this.onConnectionInterrupt.bind(this));
  }

  private onConnectionInterrupt() {
    this.socket.disconnect();
    this.onConnectFailed(this.gameName);
  }
}

export function makeConnectionGetter() {
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

  return function (game: string): Connection {
    if (!connections[game]) {
      connections[game] = new SocketIOConnection(configs[game]);
    }

    return connections[game];
  };
}

export async function sso(url: string, token: string): Promise<boolean> {
  if (!token) {
    return false;
  }

  const session = getSession() || "";
  const userClient = UserClient({
    serverUrl: url,
    token: session,
  });
  const userInfo = await userClient.sessionManager.sso({ token });

  if (userInfo && userInfo.isAuthenticated) {
    setSession(userInfo.session);

    return true;
  } else {
    removeSession();

    return false;
  }
}
