import Checkbox from '../../../../src/components/checkbox.jsx';

export default {
  props: {
    Toggle: Checkbox,
    id: 1,
    title: 'Buy all the things',
    completed: true,
    onSelect: () => { console.log('select me!'); }
  }
};
