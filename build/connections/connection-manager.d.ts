import { Connection } from "./connection";
export declare function getConnection(game: string): Connection;
export declare function removeConnection(game: string): void;
/**
 * Use for testing and development
 */
export declare function refreshSession(userSiteUrl: string, onError: Function): Promise<void>;
/**
 * Use for testing and development
 * @param userSiteUrl User site url
 * @param token
 */
export declare function sso(userSiteUrl: string, token: string): Promise<void>;
