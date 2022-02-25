declare namespace globalThis {
  export const modules = await import("@nex3/client-modules");
}

declare namespace globalThis {
  export interface Window {
    modules: typeof modules;
  }
}
