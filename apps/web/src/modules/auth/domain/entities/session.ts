export class Session {
  // Session entity class (Domain)
  // Handle session details
  sessionId: string;
  authorizationType: string;
  authorizationToken: string;
  expireIn: number;

  constructor(
    sessionId: string,
    authorizationType: string,
    authorizationToken: string,
  ) {
    this.sessionId = sessionId;
    this.authorizationType = authorizationType;
    this.authorizationToken = authorizationToken;

    this.expireIn = 7; // Default value (days)
  }

  toString(): string {
    return JSON.stringify({
      sessionId: this.sessionId,
      authorizationType: this.authorizationType,
      authorizationToken: this.authorizationToken,
    });
  }
}
