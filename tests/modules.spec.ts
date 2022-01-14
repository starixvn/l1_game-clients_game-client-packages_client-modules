import * as modules from "../src/modules";

describe("modules", () => {
  it("should expose modules", () => {
    // Arrange
    const expectedProperties = ["configs", "mobx", "mobxCocos", "connections", "languages"].sort();

    // Act
    const properties = Object.keys(modules).sort();

    // Assert
    expect(properties).toStrictEqual(expectedProperties);
  });
});
