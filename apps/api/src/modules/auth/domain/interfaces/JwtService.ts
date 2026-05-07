export abstract class JwtService {
  verify: (token: string, options: object) => Promise<any>;
  sign: (payload: object, options: object) => string;
}
