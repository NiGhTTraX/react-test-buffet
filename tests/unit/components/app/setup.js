import bind from '../../../../src/lib/bind.js';
import App from '../../../../src/components/app.jsx';
import { createSpy } from '../../helpers/chai-react.js';

export const AddTodo = createSpy({ name: 'AddTodo' });
export const TodoList = createSpy({ name: 'TodoList' });
export const TodoFilters = createSpy({ name: 'TodoFilters' });
export const filters = [{
  id: 'none',
  filter: () => false
}, {
  id: 'last_one',
  filter: (todo, i, todos) => i === todos.length - 1
}];

export default bind({ AddTodo, TodoList, TodoFilters, filters }, App);

beforeEach(function() {
  AddTodo.reset();
  TodoList.reset();
  TodoFilters.reset();
});
