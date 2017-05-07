import completedFixture from './completed.js';

export default {
  props: Object.assign({}, completedFixture.props, {
    completed: false
  })
};
