/* eslint-disable import/prefer-default-export */
// TODO: remove ^

/**
 * @param {String} todo
 */
export async function addTodo(todo) {
  await browser.setValue('.new-todo', [todo, 'Enter']);
}
