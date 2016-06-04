import appFactory from '../../src/components/app.jsx';
import addTodoFactory from '../../src/components/add-todo.jsx';
import todoListFactory from '../../src/components/todo-list.jsx';

const AddTodo = addTodoFactory();
const TodoList = todoListFactory();
const App = appFactory(AddTodo, TodoList);

export default App;
