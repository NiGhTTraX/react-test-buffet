import checkedFixture from './checked.js';

export default {
  props: Object.assign({}, checkedFixture.props, {
    checked: false
  })
};
