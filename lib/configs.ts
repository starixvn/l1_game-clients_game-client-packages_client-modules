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

export function getRateConfig() {
  return window.rateConfig?.ownRate || 1;
}

export function getEnvironmentConfigs(): Environment {
  const defaultEnvironment: Environment = {
    gameUserUrl: "",
    hostName: "",
    ssl: false,
    subpath: "",
  };

  return window.globalConfigs?.environment || defaultEnvironment;
}

export function getGameConfigs(game: string): GameConfigs {
  return window.globalConfigs?.games[game];
}

export function getGameServerUrl(game: string) {
  const { hostName, ssl } = getEnvironmentConfigs();
  const protocol = ssl ? "https" : "http";
  const { namespace } = getGameConfigs(game) || { namespace: "" };

  return `${protocol}://${hostName}${namespace}`;
}

export function getProxyRoute(game: string) {
  const { subpath } = getEnvironmentConfigs();
  const { proxyRoute } = getGameConfigs(game);

  return `${subpath}${proxyRoute}`;
}

export function getGameUserUrl() {
  return getEnvironmentConfigs().gameUserUrl;
}
