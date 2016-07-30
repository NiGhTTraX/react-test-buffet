var React = require('react'),
    Child = require('../../../src/components/child.jsx'),
    fixture = require('../../fixtures/child/base.js'),
    TestHelpers = require('../../helpers.js');


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
