import Child from '../../../src/components/child.jsx';
import fixture from '../../fixtures/child/base.js';
import { render } from '../../helpers.js';
import $ from 'jquery';


describe('Child', function() {
  let component;

  beforeEach(function() {
    component = render(Child, fixture);
  });

  it('should render foo', function() {
    expect($(component.refs.foo.getDOMNode()).text()).to.equal('bar');
  });
});
