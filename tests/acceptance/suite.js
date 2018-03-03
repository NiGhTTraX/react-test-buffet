/* eslint-disable import/prefer-default-export */
const mochaDescribe = describe;

/**
 * @param {String} name
 * @param {Function} definition
 */
export function acceptanceSuite(name, definition) {
  mochaDescribe(name, definition);
}
