import Parent from '../../../src/components/parent.jsx';
import fixture from '../../fixtures/parent/base.js';
import { render, stubMethod, getChildProps } from '../../helpers.js';


describe('Parent', function() {
  let component;

  beforeEach(function() {
    // We only care about the `children` methods here.
    stubMethod(Parent, 'render', null);

    component = render(Parent, fixture);
  });

  describe('Child', function() {
    let props;

    beforeEach(function() {
      props = getChildProps(component, 'child');
    });

    it('should send foo', function() {
      expect(props.foo).to.equal('bar');
    });

    it('should send a callback to change foo', function() {
      expect(props.callback).to.equal(component.changeFoo);
    });
  });
});
