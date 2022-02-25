export interface ConnectionOptions {
    environment: {};
}
export declare abstract class Connection {
    protected readonly serverUrl: string;
    protected readonly proxyRoute: string;
    protected readonly game: string;
    constructor(game: string);
    protected abstract onConnect(): void;
    protected abstract onDisconnect(): void;
    protected abstract onConnectFailed(): void;
    get connected(): boolean;
    abstract emit(eventName: string, ...args: any[]): void;
    abstract on(eventName: string, eventHandler: Function): void;
    abstract once(eventName: string, eventHandler: Function): void;
    abstract close(): void;
    abstract removeListener(eventName: string, handler?: Function): void;
}
