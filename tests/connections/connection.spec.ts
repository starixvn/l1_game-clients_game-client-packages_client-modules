import { getGameServerUrl, getProxyRoute } from "../../src/configs";
jest.mock("../../src/configs");

import { Connection } from "../../src/connections";

class DummyConnection extends Connection {
  protected onConnect(): void {
    throw new Error("Method not implemented.");
  }
  protected onDisconnect(): void {
    throw new Error("Method not implemented.");
  }
  protected onConnectFailed(): void {
    throw new Error("Method not implemented.");
  }
  emit(eventName: string, ...args: any[]): void {
    throw new Error("Method not implemented.");
  }
  on(eventName: string, eventHandler: Function): void {
    throw new Error("Method not implemented.");
  }
  once(eventName: string, eventHandler: Function): void {
    throw new Error("Method not implemented.");
  }
  close(): void {
    throw new Error("Method not implemented.");
  }
  removeListener(eventName: string, handler?: Function): void {
    throw new Error("Method not implemented.");
  }
}

describe("connection", () => {
  describe("constructor", () => {
    it("when called should build a server url and proxy route", () => {
      // Act
      const connection = new DummyConnection("test");

      // Assert
      expect(connection).toBeDefined();
      expect(getGameServerUrl).toBeCalled();
      expect(getProxyRoute).toBeCalled();
    });
  });

  describe("connected", () => {
    it("when get the value should return false", () => {
      // Arrange
      const connection = new DummyConnection("test");

      // Act
      const connected = connection.connected;

      // Assert
      expect(connected).toBeFalsy();
    });
  });
});
