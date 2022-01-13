import { SocketIOConnection } from "./socket-io-connection";
import { Connection } from "./connection";
import { getSession, removeSession, setSession } from "../session";
import { UserClient } from "@nex3/user-client";

const connections: Record<string, Connection> = {};

export function getConnection(game: string): Connection {
  if (!connections[game]) {
    connections[game] = new SocketIOConnection(game);
  }

  return connections[game];
}

export function removeConnection(game: string) {
  const connection = connections[game];
  if (connection) {
    connection.connected && connection.close();

    delete connections[game];
  }
}

/**
 * Use for testing and development
 * @param userSiteUrl User site url
 * @param token
 */
export async function sso(userSiteUrl: string, token: string): Promise<void> {
  if (token) {
    const session = getSession();
    const userClient = UserClient({ serverUrl: userSiteUrl, token: session.session });
    const userInfo = await userClient.sessionManager.sso({ token });

    if (userInfo && userInfo.isAuthenticated) {
      setSession(userInfo);
    } else {
      removeSession();
    }
  }

  async function refreshSession(onError: Function) {
    try {
      const session = getSession();

      if (session && session.isAuthenticated) {
        const userClient = UserClient({ serverUrl: userSiteUrl, token: session.session });

        const result = await userClient.sessionManager.updateSessionTimeout({
          ...session,
          onError,
          onUnsuccessful: onError,
        });

        if (result && result.isSuccessful) {
          const newSession = Object.assign({}, session, { expiredIn: result.expiredIn });

          setSession(newSession);
        }
      }
    } catch (error) {
      onError(error);
    }
  }

  const interval = setInterval(() => refreshSession(() => clearInterval(interval)), 60000);
}
