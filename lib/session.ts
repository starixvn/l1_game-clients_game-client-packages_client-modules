const SESSION_KEY = "session";

export function getSession() {
  return localStorage.getItem(SESSION_KEY) || "";
}

export function setSession(session: string) {
  localStorage.setItem(SESSION_KEY, session);
}

export function removeSession() {
  localStorage.removeItem(SESSION_KEY);
}
