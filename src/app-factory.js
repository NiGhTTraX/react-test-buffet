import { inject } from './lib/inject.js';
import App from './components/app.jsx';
import AddTodo from './components/add-todo.jsx';
import Todo from './components/todo.jsx';
import List from './components/list.jsx';


const TodoList = inject({ Item: Todo, className: 'todo-list' }, List);

export default inject({ AddTodo, List: TodoList }, App);
