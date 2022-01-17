import { Connection } from "./connection";
export declare class SocketIOConnection extends Connection {
    protected readonly socket: any;
    constructor(game: string);
    protected onConnectFailed(): void;
    protected onConnect(): void;
    protected onDisconnect(): void;
    get connected(): boolean;
    close(): void;
    on(eventName: string, eventHandler: Function): void;
    once(eventName: string, eventHandler: Function): void;
    removeListener(eventName: string, handler?: Function): void;
    emit(eventName: string, ...args: any[]): void;
    private registerEvents;
}
