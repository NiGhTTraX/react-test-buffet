import Child from '../../../src/components/child.jsx';
import fixture from '../../fixtures/child/base.js';
import { render, stubMethod }from '../../helpers.js';


describe('Child', function() {
  let component;

  beforeEach(function() {
    // We don't care about the output of the component here because we're only
    // testing its callbacks.
    stubMethod(Child, 'render', null);

    component = render(Child, fixture);
  });

  it('should call the parent to change foo', function() {
    component.changeFoo();

    expect(fixture.callback).to.have.been.calledWith('baz');
  });

  it('should react to new props', function() {
    render(Child, Object.assign({}, fixture, { foo: 42 }));

    expect(component.foo).to.equal(42);
  });
});
