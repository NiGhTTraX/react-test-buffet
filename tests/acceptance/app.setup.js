import appFactory from '../../src/components/app.jsx';
import todoListFactory from '../../src/components/todo-list.jsx';

const TodoList = todoListFactory();
const App = appFactory(TodoList);

export default App;
