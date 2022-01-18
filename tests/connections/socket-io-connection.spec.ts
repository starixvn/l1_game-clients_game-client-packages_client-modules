import { removeConnection } from "../../src/connections/connection-manager";
import { getSession } from "../../src/session";

const socketIOMocked = {
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn(),
  connected: false,
};

jest.mock("../../src/session");
jest.mock("../../src/connections/connection-manager");
jest.mock("../../src/configs");
jest.mock("socket.io-client", () => () => socketIOMocked);

import { SocketIOConnection } from "../../src/connections";

describe("SocketIOConnection", () => {
  beforeEach(() => {
    socketIOMocked.on.mockReset();
    socketIOMocked.emit.mockReset();
    socketIOMocked.once.mockReset();
    socketIOMocked.removeListener.mockReset();
    socketIOMocked.disconnect.mockReset();
  });

  describe("constructor", () => {
    it("when called should create an socket.io instance and register events", () => {
      // Act
      const connection = new SocketIOConnection("test");

      // Assert
      expect(connection).toBeDefined();
      expect(socketIOMocked.on).toBeCalledTimes(4);
    });
  });

  describe("onConnectFailed", () => {
    it("when called should call removeConnection method", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection["onConnectFailed"]();

      // Assert
      expect(removeConnection).toBeCalled();
    });
  });

  describe("onConnect", () => {
    it("when called should get and emit the session to server", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection["onConnect"]();

      // Assert
      expect(getSession).toBeCalled();
      expect(socketIOMocked.emit).toBeCalled();
    });
  });

  describe("onDisconnect", () => {
    it("when called should call removeConnection method", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection["onDisconnect"]();

      // Assert
      expect(removeConnection).toBeCalled();
    });
  });

  describe("connected", () => {
    test.each([[true], [false]])(
      "when called should return value from the socket.io instance",
      (value) => {
        // Arrange
        const connection = new SocketIOConnection("test");
        socketIOMocked.connected = value;

        // Act
        const connected = connection.connected;

        // Assert
        expect(connected).toBe(value);
      }
    );
  });

  describe("close", () => {
    it("when socket is null should do nothing", () => {
      // Arrange
      const connection: any = new SocketIOConnection("test");

      connection["socket"] = null;

      // Act
      connection.close();

      // Assert
      expect(socketIOMocked.disconnect).toBeCalledTimes(0);
    });

    it("when socket is defined should close connection", () => {
      // Arrange
      const connection: any = new SocketIOConnection("test");

      // Act
      connection.close();

      // Assert
      expect(socketIOMocked.disconnect).toBeCalled();
    });
  });

  describe("on", () => {
    it("when called should call on method", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection.on("test", jest.fn());

      // Assert
      expect(socketIOMocked.on).toBeCalled();
    });
  });

  describe("once", () => {
    it("when called should call once method", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection.once("test", jest.fn());

      // Assert
      expect(socketIOMocked.once).toBeCalled();
    });
  });

  describe("removeListener", () => {
    it("when called should call removeListener method", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection.removeListener("test", jest.fn());

      // Assert
      expect(socketIOMocked.removeListener).toBeCalled();
    });
  });

  describe("emit", () => {
    it("when called should call emit method", () => {
      // Arrange
      const connection = new SocketIOConnection("test");

      // Act
      connection.emit("test", jest.fn());

      // Assert
      expect(socketIOMocked.emit).toBeCalled();
    });
  });
});
