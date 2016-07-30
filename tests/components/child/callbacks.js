import Child from '../../../src/components/child.jsx';
import fixture from '../../fixtures/child/base.js';
import TestHelpers from '../../helpers.js';


describe('Child', function() {
  var component;

  beforeEach(function() {
    // We don't care about the output of the component here because we're only
    // testing its callbacks.
    TestHelpers.stubMethod(Child, 'render', null);

    component = TestHelpers.render(Child, fixture);
  });

  it('should call the parent to change foo', function() {
    component.changeFoo();

    expect(fixture.callback).to.have.been.calledWith('baz');
  });

  it('should react to new props', function() {
    TestHelpers.render(Child, Object.assign({}, fixture, { foo: 42 }));

    expect(component.foo).to.equal(42);
  });
});
