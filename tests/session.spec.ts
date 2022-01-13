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
      const session = getSession();

      expect(session).toBeDefined();
      expect(localStorageMock.getItem).toBeCalled();
    });
  });

  describe("setSession", () => {
    it("when called should call localStorage.setItem", () => {
      const session = {} as any;

      setSession(session);

      expect(localStorageMock.setItem).toBeCalled();
    });
  });

  describe("removeSession", () => {
    it("when called should call localStorage.removeSession", () => {
      removeSession();

      expect(localStorageMock.removeItem).toBeCalled();
    });
  });
});
