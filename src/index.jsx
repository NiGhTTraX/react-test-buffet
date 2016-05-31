import React from 'react';
import ReactDOM from 'react-dom';
import appFactory from './components/app.jsx';
import todoListFactory from './components/todo-list.jsx';

const TodoList = todoListFactory();
const App = appFactory(TodoList);


ReactDOM.render(<App />, document.getElementById('root'));
