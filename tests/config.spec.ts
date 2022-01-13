import { getRateConfig } from "../src/configs";

describe("configs", () => {
  describe("getRateConfig", () => {
    it("when global variable is not defined should return default value", () => {
      const rate = getRateConfig();

      expect(rate).toBe(1);
    });

    it("when global variable is null should return default value", () => {
      window.rateConfig = null;

      const rate = getRateConfig();

      expect(rate).toBe(1);
    });

    it("should return value from the global variable", () => {
      window.rateConfig = { ownRate: 2 };

      const rate = getRateConfig();

      expect(rate).toBe(2);
    });
  });
});
