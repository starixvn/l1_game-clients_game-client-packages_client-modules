import { getSession, removeSession, setSession } from "../src/session";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

describe("session", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    localStorageMock.removeItem.mockReset();
  });

  describe("getSession", () => {
    it("when called should return session instance", () => {
      // Act
      const session = getSession();

      // Assert
      expect(session).toBeDefined();
      expect(localStorageMock.getItem).toBeCalled();
    });
  });

  describe("setSession", () => {
    it("when called should call localStorage.setItem", () => {
      // Arrange
      const session = {} as any;

      // Act
      setSession(session);

      // Assert
      expect(localStorageMock.setItem).toBeCalled();
    });
  });

  describe("removeSession", () => {
    it("when called should call localStorage.removeSession", () => {
      // Act
      removeSession();

      // Assert
      expect(localStorageMock.removeItem).toBeCalled();
    });
  });
});
