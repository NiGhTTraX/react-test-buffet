// Mocha globals.
const { describe, it, beforeEach, afterEach, before, after } = global;

export { describe as suite, it, beforeEach, afterEach, before, after };

delete global.describe;
delete global.beforeEach;
delete global.afterEach;
delete global.before;
delete global.afer;
delete global.it;
