import selectedFixture from './selected.js';

export default {
  props: Object.assign({}, selectedFixture.props, {
    selected: false
  })
};
