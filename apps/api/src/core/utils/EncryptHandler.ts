import * as argon2 from 'argon2';

export class EncryptHandler {
  /**
   * Hash string values using bycrypt library
   * @param {string} value value to be encrypted
   * @returns {Promise<stirng>} hased value
   */
  public encrypt(value: string): Promise<string> {
    return argon2.hash(value, {
      timeCost: 3,
      parallelism: 1,
      memoryCost: 65536,
      type: argon2.argon2id,
    });
  }

  /**
   * Verify string hashed value with no hashed value
   * @param {string} value value to be validated
   * @returns {Promise<stirng>} validation response
   */
  public verify(value: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, value);
  }
}
