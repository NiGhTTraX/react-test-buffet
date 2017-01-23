/* eslint-disable import/prefer-default-export */
// TODO: remove ^

/**
 * @param {String} todo
 */
export function addTodo(todo) {
  browser.click('.new-todo');
  browser.keys(todo);
  browser.keys(['Enter']);
}
