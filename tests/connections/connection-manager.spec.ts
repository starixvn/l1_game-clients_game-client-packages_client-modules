import {
  getConnection,
  refreshSession,
  removeConnection,
  sso,
} from "../../src/connections/connection-manager";
import { SocketIOConnection } from "../../src/connections/socket-io-connection";
import { getSession as actualGetSession, setSession as actualSetSession } from "../../src/session";

const sessionManagerMock = { updateSessionTimeout: jest.fn(), sso: jest.fn() };
const setIntervalMock = jest.fn();
const clearIntervalMock = jest.fn();
const getSession = actualGetSession as jest.Mock;
const setSession = actualSetSession as jest.Mock;

jest.mock("../../src/session");
jest.mock("../../src/connections/socket-io-connection");
jest.mock("@nex3/user-client", () => ({
  UserClient: () => ({ sessionManager: sessionManagerMock }),
}));

globalThis.setInterval = setIntervalMock as any;
globalThis.clearInterval = clearIntervalMock as any;

describe("connection-manager", () => {
  describe("getConnection", () => {
    it("when called should create the new instance of connection", () => {
      // Act
      const connection = getConnection("test");

      // Assert
      expect(connection).toBeInstanceOf(SocketIOConnection);
    });
  });

  describe("removeConnection", () => {
    it("when called should close the connection", () => {
      // Arrange
      const connection: any = getConnection("test");
      connection["connected"] = true;

      // Act
      removeConnection("test");

      // Assert
      expect(connection.close).toBeCalled();
    });
  });

  describe("refreshSession", () => {
    beforeEach(() => {
      getSession.mockClear();
      sessionManagerMock.updateSessionTimeout.mockClear();
      setSession.mockClear();
    });

    it("when error should call the callback method", () => {
      // Arrange
      const callback = jest.fn();

      getSession.mockReturnValue({ isAuthenticated: true });
      sessionManagerMock.updateSessionTimeout.mockImplementation(() => {
        throw Error();
      });

      // Act
      refreshSession("url", callback);

      // Assert
      expect(callback).toBeCalled();
    });

    it("when called should call updateSessionTimeout method", () => {
      // Arrange
      const callback = jest.fn();

      getSession.mockReturnValue({ isAuthenticated: true });
      sessionManagerMock.updateSessionTimeout.mockResolvedValue({
        isSuccessful: true,
        expiredIn: "expire time",
      });

      // Act
      refreshSession("url", callback);

      // Assert
      expect(sessionManagerMock.updateSessionTimeout).toBeCalled();
      expect(callback).toBeCalledTimes(0);
    });

    it("when session is undefined should do nothing", () => {
      // Arrange
      const callback = jest.fn();

      getSession.mockReturnValue(undefined);
      // Act
      refreshSession("url", callback);

      // Assert
      expect(getSession).toBeCalled();
      expect(callback).toBeCalledTimes(0);
    });
  });

  describe("sso", () => {
    beforeEach(() => {
      getSession.mockReset();
      sessionManagerMock.sso.mockReset();
    });

    it("when token is null should create new interval", () => {
      // Arrange
      getSession.mockReturnValue(undefined);
      setIntervalMock.mockImplementation((callback) => {
        callback();
      });

      // Act
      sso("url", null);

      // Assert
      expect(setIntervalMock).toBeCalled();
    });

    it("when refresh session is failure should clear the interval", () => {
      // Arrange
      getSession.mockImplementation(() => {
        throw new Error();
      });
      setIntervalMock.mockImplementation((callback) => {
        callback();
      });

      // Act
      sso("url", null);

      // Assert
      expect(clearIntervalMock).toBeCalled();
    });

    it("when sso successful should call sso method", () => {
      // Arrange
      getSession.mockReturnValue({});
      setIntervalMock.mockImplementation((callback) => {
        callback();
      });
      sessionManagerMock.sso.mockResolvedValue({ isAuthenticated: true });

      // Act
      sso("url", "token");

      // Assert
      expect(sessionManagerMock.sso).toBeCalled();
    });

    test.each([[{ isAuthenticated: false }], [undefined]])(
      "when sso unsuccessful should call sso method",
      (userInfo) => {
        // Arrange
        getSession.mockReturnValue({});
        setIntervalMock.mockImplementation((callback) => {
          callback();
        });
        sessionManagerMock.sso.mockResolvedValue(userInfo);

        // Act
        sso("url", "token");

        // Assert
        expect(sessionManagerMock.sso).toBeCalled();
      }
    );
  });
});
