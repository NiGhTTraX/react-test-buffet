import appFactory from '../../../../src/components/app.jsx';
import { fakeComponentFactory } from '../../../helpers/chai-react.js';

export const TodoList = fakeComponentFactory({ name: 'TodoList' });

const App = appFactory(TodoList);

export default App;
