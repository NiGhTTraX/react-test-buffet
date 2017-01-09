import { inject } from './lib/inject.js';
import App from './components/app.jsx';
import AddTodo from './components/add-todo.jsx';
import Todo from './components/todo.jsx';
import Checkbox from './components/checkbox.jsx';
import List from './components/list.jsx';


const CheckableTodo = inject({ Toggle: Checkbox }, Todo);
const TodoList = inject({ Item: CheckableTodo, className: 'todo-list' }, List);

export default inject({ AddTodo, List: TodoList }, App);
