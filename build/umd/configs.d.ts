declare global {
    export interface Window {
        rateConfig?: {
            ownRate: number;
        };
        globalConfigs: GlobalConfigs;
    }
    export interface GlobalConfigs {
        environment?: Environment;
        games?: Record<string, GameConfigs>;
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
export declare function getRateConfig(): number;
export declare function getEnvironmentConfigs(): Environment;
export declare function getGameConfigs(game: string): GameConfigs;
export declare function getGameServerUrl(game: string): string;
export declare function getProxyRoute(game: string): string;
export declare function getGameUserUrl(): string;
