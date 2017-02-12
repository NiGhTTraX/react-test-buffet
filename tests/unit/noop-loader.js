/**
 * Emit empty modules.
 */
module.exports = function noopLoader() {
  return 'module.exports = \'\';';
};
