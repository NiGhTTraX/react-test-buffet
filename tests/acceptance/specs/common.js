/* eslint-disable import/prefer-default-export */
// TODO: remove ^

/**
 * @param {String} todo
 */
export async function addTodo(todo) {
  await browser.click('.new-todo');
  await browser.keys(todo);
  await browser.keys(['Enter']);
}
