const sessionKey = `${window.location.hostname}.scss`;

export interface Session {
  username: string;
  language: string;
  session: string;
  currency: string;
  expiredIn: Date;
  isAuthenticated: boolean;
  ss?: string;
}

export function getSession(): Session {
  return JSON.parse(localStorage.getItem(sessionKey) || "{}");
}

export function setSession(session: Session) {
  session.ss = session.session;

  localStorage.setItem(sessionKey, JSON.stringify(session));
}

export function removeSession() {
  localStorage.removeItem(sessionKey);
}
