import AddTodo from '../../../../src/components/add-todo.jsx';
import Checkbox from '../../../../src/components/checkbox.jsx';
import TodoFilter from '../../../../src/components/todo-filter.jsx';
import Todo from '../../../../src/components/todo.jsx';
import List from '../../../../src/components/list.jsx';
import bind from '../../../../src/lib/bind.js';

const filters = [{
  id: 'active',
  name: 'Active',
  filter: todo => !todo.completed
}, {
  id: 'completed',
  name: 'Completed',
  filter: todo => todo.completed
}];


// TODO: dedupe these with app-factory
const CheckableTodo = bind({ Toggle: Checkbox }, Todo);
const TodoList = bind({ Item: CheckableTodo, className: 'todo-list' }, List);
const TodoFilters = bind({ Item: TodoFilter, className: 'filters' }, List);

export default {
  props: {
    AddTodo,
    TodoList,
    TodoFilters,
    filters
  }
};
