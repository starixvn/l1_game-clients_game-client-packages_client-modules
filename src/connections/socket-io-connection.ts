import SocketIOClient from "socket.io-client";
import { getSession } from "../session";
import { Connection } from "./connection";
import { removeConnection } from "./connection-manager";

export class SocketIOConnection extends Connection {
  protected readonly socket;

  constructor(game: string) {
    super(game);

    const options = {
      transports: ["websocket"],
      upgrade: false,
      path: this.proxyRoute,
      forceNew: true,
    };

    this.socket = SocketIOClient(this.serverUrl, options);
    this.registerEvents();
  }

  protected onConnectFailed(): void {
    removeConnection(this.game);
  }

  protected onConnect(): void {
    const signInEvent = "signin";

    this.emit(signInEvent, getSession());
  }

  protected onDisconnect(): void {
    removeConnection(this.game);
  }

  public get connected(): boolean {
    return this.socket.connected;
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

  private registerEvents() {
    const connectEvent = "connect";
    const disconnectEvent = "disconnect";
    const connectFailedEvent = "connect_failed";
    const connectErrorEvent = "connect_error";

    this.on(connectEvent, this.onConnect.bind(this));
    this.on(connectFailedEvent, this.onConnectFailed.bind(this));
    this.on(connectErrorEvent, this.onConnectFailed.bind(this));
    this.on(disconnectEvent, this.onDisconnect.bind(this));
  }
}
