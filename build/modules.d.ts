declare abstract class Connection {
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
declare class SocketIOConnection extends Connection {
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
declare function getConnection(game: string): Connection;
declare function sso(userSiteUrl: string, token: string): Promise<void>;
export interface Session {
	username: string;
	language: string;
	session: string;
	currency: string;
	expiredIn: Date;
	isAuthenticated: boolean;
	ss?: string;
}
declare function getSession(): Session;
declare function setSession(session: Session): void;
declare function removeSession(): void;
declare global {
	export interface Window {
		rateConfig?: {
			ownRate: number;
		};
		globalConfigs: GlobalConfigs;
	}
	export interface GlobalConfigs {
		environment: Environment;
		games: Record<string, GameConfigs>;
	}
	export interface Environment {
		ssl: boolean;
		hostName: string;
		subpath: string;
		gameUserUrl: string;
	}
	export interface GameConfigs {
		id: number;
		name: string;
		messageObject: string;
		serverConfigName: string;
		needQueryNotification: boolean;
		namespace: string;
		proxyRoute: string;
	}
}
declare global {
	interface GlobalConfigs {
		supportedLanguages?: {
			code: string;
			text: string;
		}[];
		defaultLanguage?: string;
	}
	export interface Window {
		language: string;
		globalConfigs: GlobalConfigs;
	}
}
export declare const connections: {
	SocketIOConnection: typeof SocketIOConnection;
	getConnection: typeof getConnection;
	sso: typeof sso;
	getSession: typeof getSession;
	setSession: typeof setSession;
	removeSession: typeof removeSession;
};
export * as mobx from "mobx";
export * as mobxCocos from "mobx-cocos";

export as namespace modules;

export {};
