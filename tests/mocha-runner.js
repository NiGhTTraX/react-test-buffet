// Mocha globals.
const { describe, it, beforeEach, afterEach, before, after } = global;

/**
 * @param {String} name
 * @param (testName: String) => Promise) definition Called with the fully
 *   qualified name of the test including any parent suite names.
 */
export function runnerIt(name, definition) {
  it(name, function() {
    const testName = this.test.fullTitle();

    return definition(testName);
  });
}

export {
  describe as runnerDescribe,
  beforeEach as runnerBeforeEach,
  afterEach as runnerAfterEach,
  before as runnerBefore,
  after as runnerAfter
};

delete global.describe;
delete global.beforeEach;
delete global.afterEach;
delete global.before;
delete global.after;
delete global.it;
