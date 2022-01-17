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
export declare function isLanguageSupported(language: string): boolean;
export declare function getLanguages(): {
    code: string;
    text: string;
}[];
export declare function getLanguage(): string;
export declare function getDefaultLanguage(): string;
export declare function setLanguage(language: string): void;
