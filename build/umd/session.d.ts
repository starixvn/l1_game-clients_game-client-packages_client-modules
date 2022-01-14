export interface Session {
    username: string;
    language: string;
    session: string;
    currency: string;
    expiredIn: Date;
    isAuthenticated: boolean;
    ss?: string;
}
export declare function getSession(): Session;
export declare function setSession(session: Session): void;
export declare function removeSession(): void;
