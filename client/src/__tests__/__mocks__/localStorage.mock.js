/**
 *
 *
 * @class LocalStorageMock
 */
class LocalStorageMock {
  /**
   * Creates an instance of LocalStorageMock.
   * @memberof LocalStorageMock
   */
  constructor() {
    this.store = {};
  }
  /**
 *
 *@returns {any} some
 * @memberof LocalStorageMock
 */
  clear() {
    this.store = {};
  }
  /**
 *
 *
 * @param {any} key
 * @returns {any} some
 * @memberof LocalStorageMock
 */
  getItem(key) {
    return this.store[key] || null;
  }
  /**
 *
 *@returns {any} some
 * @param {any} key
 * @param {any} value
 * @memberof LocalStorageMock
 */
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  /**
 * @returns {any} some
 *
 * @param {any} key
 * @memberof LocalStorageMock
 */
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
