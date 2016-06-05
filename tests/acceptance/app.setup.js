import appFactory from '../../src/components/app.jsx';
import addTodoFactory from '../../src/components/add-todo.jsx';
import todoFactory from '../../src/components/todo.jsx';
import todoListFactory from '../../src/components/todo-list.jsx';

const AddTodo = addTodoFactory();
const Todo = todoFactory();
const TodoList = todoListFactory(Todo);
const App = appFactory(AddTodo, TodoList);

export default App;
