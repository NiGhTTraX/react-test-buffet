import { inject } from '../../src/lib/inject.js';
import App from '../../src/components/app.jsx';
import addTodoFactory from '../../src/components/add-todo.jsx';
import todoFactory from '../../src/components/todo.jsx';
import todoListFactory from '../../src/components/todo-list.jsx';

const AddTodo = addTodoFactory();
const Todo = todoFactory();
const TodoList = todoListFactory(Todo);

export default inject({ AddTodo, TodoList }, App);
