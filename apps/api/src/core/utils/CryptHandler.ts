import * as bcrypt from 'bcrypt';

import { InternalServerErrorException } from '@nestjs/common';

export class EncryptHandler {
  /**
   * Hash string values using bycrypt library
   * @param {string} value value to be encrypted
   * @returns {Promise<stirng>} hased value
   */
  public encrypt(value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(value, 10, (err: unknown, hash: string) => {
        if (err) return reject(new InternalServerErrorException(err));
        return resolve(hash);
      });
    });
  }

  /**
   * Verify string hashed value with no hashed value
   * @param {string} value value to be validated
   * @returns {Promise<stirng>} validation response
   */
  public verify(value: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(value, hash, (err: unknown, isMatch: boolean) => {
        if (err) return reject(new InternalServerErrorException(err));
        return resolve(isMatch);
      });
    });
  }
}
