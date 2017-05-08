import bind from './lib/bind.js';
import App from './components/app.jsx';
import AddTodo from './components/add-todo.jsx';
import Todo from './components/todo.jsx';
import Checkbox from './components/checkbox.jsx';
import List from './components/list.jsx';
import TodoFilter from './components/todo-filter.jsx';

const filters = [{
  id: 'active',
  name: 'Active',
  filter: todo => !todo.completed
}, {
  id: 'completed',
  name: 'Completed',
  filter: todo => todo.completed
}];


const CheckableTodo = bind({ Toggle: Checkbox }, Todo);
const TodoList = bind({ Item: CheckableTodo, className: 'todo-list' }, List);
const TodoFilters = bind({ Item: TodoFilter, className: 'filters' }, List);

export default bind({ AddTodo, TodoList, TodoFilters, filters }, App);
