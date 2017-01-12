/* eslint-disable import/prefer-default-export */
// TODO: remove ^

/**
 * @param {WebDriver} client
 * @param {String} todo
 *
 * @returns {Promise}
 */
export function addTodo(client, todo) {
  return client.click('.new-todo')
    .then(() => client.keys(todo))
    .then(() => client.keys(['Enter']));
}
