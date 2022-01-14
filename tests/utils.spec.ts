import { getI18NInstance } from "../src/utils";

describe("utils", () => {
  describe("getI18NInstance", () => {
    it("the instance should be defined", () => {
      // Act
      const i18n = getI18NInstance();

      // Assert
      expect(i18n).toBeDefined();
    });
  });
});
