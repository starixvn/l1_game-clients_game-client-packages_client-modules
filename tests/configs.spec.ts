import {
  getEnvironmentConfigs,
  getGameConfigs,
  getRateConfig,
  getGameServerUrl,
  getProxyRoute,
  getGameUserUrl,
} from "../src/configs";

describe("configs", () => {
  describe("getRateConfig", () => {
    it("when global variable is not defined should return default value", () => {
      // Act
      const rate = getRateConfig();

      // Assert
      expect(rate).toBe(1);
    });

    it("when global variable is null should return default value", () => {
      // Arrange
      window.rateConfig = null;

      // Act
      const rate = getRateConfig();

      // Assert
      expect(rate).toBe(1);
    });

    it("should return value from the global variable", () => {
      // Arrange
      window.rateConfig = { ownRate: 2 };

      // Act
      const rate = getRateConfig();

      // Assert
      expect(rate).toBe(2);
    });
  });

  describe("getEnvironmentConfigs", () => {
    test.each([[null], [undefined]])(
      "when the global variable is undefined or null should return default value",
      (globalConfigs: GlobalConfigs) => {
        // Arrange
        window.globalConfigs = globalConfigs;

        const expectConfigs = {
          gameUserUrl: "",
          hostName: "",
          ssl: false,
          subpath: "",
        };

        // Act
        const configs = getEnvironmentConfigs();

        // Assert
        expect(configs).toStrictEqual(expectConfigs);
      }
    );

    it("when defined global variable should return it", () => {
      // Arrange
      const environment = {
        gameUserUrl: "test url",
        hostName: "test hostname",
        ssl: false,
        subpath: "/test",
      };

      window.globalConfigs = { environment };

      // Act
      const configs = getEnvironmentConfigs();

      // Assert
      expect(configs).toStrictEqual(environment);
    });
  });

  describe("getGameConfigs", () => {
    test.each([[null], [undefined]])(
      "when the global variable is undefined or null should return undefined",
      (globalConfigs: GlobalConfigs) => {
        // Arrange
        window.globalConfigs = globalConfigs;

        // Act
        const configs = getGameConfigs("game");

        // Assert
        expect(configs).toBeUndefined();
      }
    );

    it("when defined global variable should return it", () => {
      // Arrange
      const game: GameConfigs = {
        id: 1,
        name: "game",
        messageObject: "game",
        namespace: "namespace",
        needQueryNotification: false,
        proxyRoute: "route",
        serverConfigName: "game",
      };

      window.globalConfigs = { games: { game } };

      // Act
      const configs = getGameConfigs("game");

      // Assert
      expect(configs).toStrictEqual(game);
    });
  });

  describe("getGameServerUrl", () => {
    beforeEach(() => {
      const environment = {
        gameUserUrl: "user",
        hostName: "hostname",
        ssl: false,
        subpath: "/test",
      };

      const game: GameConfigs = {
        id: 1,
        name: "game",
        messageObject: "game",
        namespace: "/namespace",
        needQueryNotification: false,
        proxyRoute: "/route",
        serverConfigName: "game",
      };

      window.globalConfigs = { environment, games: { game } };
    });

    it("when using ssl should return https protocol", () => {
      // Arrange
      window.globalConfigs.environment.ssl = true;
      const expectedUrl = "https://hostname/namespace";

      // Act
      const url = getGameServerUrl("game");

      // Assert
      expect(url).toBe(expectedUrl);
    });

    it("when not using ssl should return http protocol", () => {
      // Arrange
      window.globalConfigs.environment.ssl = false;
      const expectedUrl = "http://hostname";

      // Act
      const url = getGameServerUrl("gameA");

      // Assert
      expect(url).toBe(expectedUrl);
    });
  });

  describe("getProxyRoute", () => {
    beforeEach(() => {
      const environment = {
        gameUserUrl: "user",
        hostName: "hostname",
        ssl: false,
        subpath: "/test",
      };

      const game: GameConfigs = {
        id: 1,
        name: "game",
        messageObject: "game",
        namespace: "/namespace",
        needQueryNotification: false,
        proxyRoute: "/route",
        serverConfigName: "game",
      };

      window.globalConfigs = { environment, games: { game } };
    });

    it("should return proxy route", () => {
      // Arrange
      const expectedRoute = "/test/route";

      // Act
      const route = getProxyRoute("game");

      // Assert
      expect(route).toBe(expectedRoute);
    });
  });

  describe("getGameUserUrl", () => {
    beforeEach(() => {
      const environment = {
        gameUserUrl: "user",
        hostName: "hostname",
        ssl: false,
        subpath: "/test",
      };

      window.globalConfigs = { environment };
    });

    it("should return proxy route", () => {
      // Act
      const url = getGameUserUrl();

      // Assert
      expect(url).toBe("user");
    });
  });
});
