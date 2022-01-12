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
export declare class SocketIOConnection implements Connection {
    private readonly socket;
    private readonly gameName;
    private readonly onConnectFailed;
    constructor(options: SocketIOConnectionOptions);
    close(): void;
    on(eventName: string, eventHandler: Function): void;
    once(eventName: string, eventHandler: Function): void;
    removeListener(eventName: string, handler?: Function): void;
    emit(eventName: string, ...args: any[]): void;
    get connected(): boolean;
    private registerEvents;
    private onConnectionInterrupt;
}
export declare function makeConnectionGetter(): (game: string) => Connection;
export declare function sso(url: string, token: string): Promise<boolean>;
