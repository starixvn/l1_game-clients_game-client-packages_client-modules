import { getGameServerUrl, getProxyRoute } from "../configs";

export interface ConnectionOptions {
  environment: {};
}

export abstract class Connection {
  protected readonly serverUrl: string;
  protected readonly proxyRoute: string;
  protected readonly game: string;

  constructor(game: string) {
    this.serverUrl = getGameServerUrl(game);
    this.proxyRoute = getProxyRoute(game);
    this.game = game;
  }

  protected abstract onConnect(): void;
  protected abstract onDisconnect(): void;
  protected abstract onConnectFailed(): void;

  get connected(): boolean {
    return false;
  }

  abstract emit(eventName: string, ...args: any[]): void;
  abstract on(eventName: string, eventHandler: Function): void;
  abstract once(eventName: string, eventHandler: Function): void;
  abstract close(): void;
  abstract removeListener(eventName: string, handler?: Function): void;
}
