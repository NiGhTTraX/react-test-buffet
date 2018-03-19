import {
  runnerAfterEach,
  runnerBeforeEach,
  runnerDescribe,
  runnerIt
} from '../acceptance/test-runner';
import expect from './helpers/expect';

export function describe(name, definition) {
  runnerDescribe(name, definition);
}

export function it(name, definition) {
  runnerIt(name, definition);
}

export function beforeEach(definition) {
  runnerBeforeEach(definition);
}

export function afterEach(definition) {
  runnerAfterEach(definition);
}

export { expect };
