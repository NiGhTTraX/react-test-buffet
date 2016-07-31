/**
 * @fileoverview
 * Fail tests whenever React throws any warning.
 */

const REACT_WARNING_PATTERN = /^Warning:/;
const consoleMethodsToIntercept = ['warn', 'error'];


consoleMethodsToIntercept.forEach(method => {
  const oldMethod = console[method];

  console[method] = (msg, ...args) => {
    if (REACT_WARNING_PATTERN.test(msg)) {
      throw new Error(msg);
    }

    oldMethod.call(console, msg, ...args);
  };
});
