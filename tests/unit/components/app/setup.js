import appFactory from '../../../../src/components/app.jsx';
import { fakeComponentFactory } from '../../../helpers/chai-react.js';

export const AddTodo = fakeComponentFactory({ name: 'AddTodo' });
export const TodoList = fakeComponentFactory({ name: 'TodoList' });

const App = appFactory(AddTodo, TodoList);

export default App;

beforeEach(function() {
  AddTodo.reset();
  TodoList.reset();
});
