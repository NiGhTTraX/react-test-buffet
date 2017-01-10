import inject from '../../../../src/lib/inject.js';
import App from '../../../../src/components/app.jsx';
import { fakeComponentFactory } from '../../../helpers/chai-react.js';

export const AddTodo = fakeComponentFactory({ name: 'AddTodo' });
export const List = fakeComponentFactory({ name: 'List' });

export default inject({ AddTodo, List }, App);

beforeEach(function() {
  AddTodo.reset();
  List.reset();
});
