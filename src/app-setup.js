import { inject } from './lib/inject.js';
import App from './components/app.jsx';
import AddTodo from './components/add-todo.jsx';
import Todo from './components/todo.jsx';
import TodoList from './components/todo-list.jsx';


// TODO: figure out a better name for partially applied components
const TodoList2 = inject({ Todo }, TodoList);

export default inject({ AddTodo, TodoList: TodoList2 }, App);
