// Mocha globals.
const { describe, it, beforeEach, afterEach, before, after } = global;

export {
  describe as runnerDescribe,
  it as runnerIt,
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
