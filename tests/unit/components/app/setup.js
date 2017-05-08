import bind from '../../../../src/lib/bind.js';
import App from '../../../../src/components/app.jsx';
import { createSpy } from '../../helpers/chai-react.js';

export const AddTodo = createSpy({ name: 'AddTodo' });
export const List = createSpy({ name: 'List' });
export const Select = createSpy({ name: 'Select' });
export const filters = [{
  id: 'none',
  filter: () => false
}, {
  id: 'last_one',
  filter: (todo, i, todos) => i === todos.length - 1
}];

export default bind({ AddTodo, List, Select, filters }, App);

beforeEach(function() {
  AddTodo.reset();
  List.reset();
  Select.reset();
});
