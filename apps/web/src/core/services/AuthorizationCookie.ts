export interface IAuthorizationHandler {
  setAuthorization(authorization: string): void;
  obtainAuthorization(): void;
}

export class AuthorizationCookieHandler implements IAuthorizationHandler {
  key: string;

  constructor() {
    this.key = "authorization";
  }

  setAuthorization(authorization: string) {
    const daysToExpire = 7;
    const expires = new Date(Date.now() + daysToExpire * 864e5).toUTCString();
    document.cookie = `${this.key}=${authorization}; expires=${expires}; path=/`;
  }

  obtainAuthorization() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith(`${this.key}=`));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
}
