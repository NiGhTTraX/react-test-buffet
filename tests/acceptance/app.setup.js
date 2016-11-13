import { inject } from '../../src/lib/inject.js';
import App from '../../src/components/app.jsx';
import addTodoFactory from '../../src/components/add-todo.jsx';
import todoFactory from '../../src/components/todo.jsx';
import TodoList from '../../src/components/todo-list.jsx';

const AddTodo = addTodoFactory();
const Todo = todoFactory();
// TODO: figure out a better name for partially applied components
const TodoList2 = inject({ Todo }, TodoList);

export default inject({ AddTodo, TodoList: TodoList2 }, App);
