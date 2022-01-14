import { getEnvironmentConfigs, getRateConfig } from "../src/configs";

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
});
