import bind from '../../../../src/lib/bind.js';
import App from '../../../../src/components/app.jsx';
import { createReactStub } from '../../helpers/chai-react';

export const AddTodo = createReactStub();
export const TodoList = createReactStub();
export const TodoFilters = createReactStub();
export const filters = [{
  id: 'none',
  name: 'None',
  filter: () => false
}, {
  id: 'last_one',
  name: 'Last one',
  filter: (todo, i, todos) => i === todos.length - 1
}];

export default bind({ AddTodo, TodoList, TodoFilters, filters }, App);
