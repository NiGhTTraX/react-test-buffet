import Parent from '../../../src/components/parent.jsx';
import fixture from '../../fixtures/parent/base.js';
import TestHelpers from '../../helpers.js';


describe('Parent', function() {
  var component;

  beforeEach(function() {
    // We only care about the `children` methods here.
    TestHelpers.stubMethod(Parent, 'render', null);

    component = TestHelpers.render(Parent, fixture);
  });

  describe('Child', function() {
    var props;

    beforeEach(function() {
      props = TestHelpers.getChildProps(component, 'child');
    });

    it('should send foo', function() {
      expect(props.foo).to.equal('bar');
    });

    it('should send a callback to change foo', function() {
      expect(props.callback).to.equal(component.changeFoo);
    });
  });
});
