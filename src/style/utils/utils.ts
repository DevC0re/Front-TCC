export function isTokenValid(token: string) {
  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return false;
    }

    const base64 = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const payload = JSON.parse(atob(base64));

    if (!payload.sub) {
      return false;
    }

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false;
    }

    return true;

  } catch {
    return false;
  }
}