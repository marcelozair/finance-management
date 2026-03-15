export interface TOTPSecretDto {
  base32: string;
  otpauth_url?: string;
}

export interface TOTPSecretConfigDto {
  name: string;
  issuer: string;
  length: number;
}

export interface VerifySecretDto {
  token: string;
  secret: string;
  encoding: 'base32';
}

export abstract class TOTPService {
  verifySecret: (secretOptions: VerifySecretDto) => boolean;
  convertSecretIntoQR: (secret: string) => Promise<string>;
  generateSecret: (options: TOTPSecretConfigDto) => TOTPSecretDto;
}
