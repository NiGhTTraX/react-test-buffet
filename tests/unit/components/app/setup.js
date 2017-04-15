import bind from '../../../../src/lib/bind.js';
import App from '../../../../src/components/app.jsx';
import { createSpy } from '../../helpers/chai-react.js';

export const AddTodo = createSpy({ name: 'AddTodo' });
export const List = createSpy({ name: 'List' });

export default bind({ AddTodo, List }, App);

beforeEach(function() {
  AddTodo.reset();
  List.reset();
});
