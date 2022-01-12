declare global {
    export interface Window {
        rateConfig?: {
            ownRate: number;
        };
    }
}
export declare function getRateConfig(): number;
