import bcrypt from 'bcrypt';


/**
 *
 *
 * @export
 * @class PasswordHelper
 */
export default class PasswordHelper {
  /**
   *
   *
   * @param {any} password
   * @returns { hash } for password
   * @memberof
   */
  hashPassword(password) {
    this.salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, this.salt);
    return hash;
  }
  /**
   *
   *
   * @param {any} password
   * @param {any} hash
   * @memberof PasswordHelper
   */

  /**
	 *
	 *
	 * @param {any} password
	 * @param {any} hash
	 * @returns { unhash } for password
	 * @memberof PasswordHelper
	 */
  decrypt(password, hash) {
    this.status = bcrypt.compareSync(password, hash);
    return this.status;
  }
}
