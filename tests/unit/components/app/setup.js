import { inject } from '../../../../src/lib/inject.js';
import App from '../../../../src/components/app.jsx';
import { fakeComponentFactory } from '../../../helpers/chai-react.js';

export const AddTodo = fakeComponentFactory({ name: 'AddTodo' });
export const TodoList = fakeComponentFactory({ name: 'TodoList' });

export default inject({ AddTodo, TodoList }, App);

beforeEach(function() {
  AddTodo.reset();
  TodoList.reset();
});
