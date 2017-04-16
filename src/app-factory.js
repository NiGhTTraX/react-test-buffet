import bind from './lib/bind.js';
import App from './components/app.jsx';
import AddTodo from './components/add-todo.jsx';
import Todo from './components/todo.jsx';
import Checkbox from './components/checkbox.jsx';
import List from './components/list.jsx';


const CheckableTodo = bind({ Toggle: Checkbox }, Todo);
const TodoList = bind({ Item: CheckableTodo, className: 'todo-list' }, List);

export default bind({ AddTodo, List: TodoList }, App);
