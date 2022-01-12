declare global {
    export interface Window {
        language: string;
    }
}
export declare function isLanguageSupported(language: string): boolean;
export declare function getLanguages(): string[];
export declare function getLanguage(): string;
export declare function getDefaultLanguage(): string;
export declare function setLanguage(language: string): void;
