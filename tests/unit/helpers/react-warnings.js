/**
 * @fileoverview
 * Fail tests whenever React throws any warning.
 */

const REACT_WARNING_PATTERN = /^Warning:/;


const { error } = console;

console.error = (msg, ...args) => {
  if (REACT_WARNING_PATTERN.test(msg)) {
    throw new Error(msg);
  }

  error.call(console, msg, ...args);
};
