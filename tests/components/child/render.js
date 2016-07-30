import Child from '../../../src/components/child.jsx';
import fixture from '../../fixtures/child/base.js';
import TestHelpers from '../../helpers.js';
import $ from 'jquery';


describe('Child', function() {
  var component;

  beforeEach(function() {
    component = TestHelpers.render(Child, fixture);
  });

  it('should render foo', function() {
    expect($(component.refs.foo.getDOMNode()).text()).to.equal('bar');
  });
});
