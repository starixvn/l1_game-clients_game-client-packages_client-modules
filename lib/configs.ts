declare global {
  export interface Window {
    rateConfig?: {
      ownRate: number;
    };
  }
}

export function getRateConfig() {
  return window.rateConfig?.ownRate || 1;
}
