var React = require('react'),
    Child = require('../../../src/components/child.jsx'),
    TestHelpers = require('../../helpers.js'),
    sinon = require('sinon');


describe('Child', function() {
  var component;
  var changeFooCallback;


  beforeEach(function() {
    changeFooCallback = sinon.spy();

    // We don't care about the output of the component here because we're only
    // testing its callbacks.
    TestHelpers.stubMethod(Child, 'render', null);

    component = TestHelpers.render(Child, { callback: changeFooCallback });
  });

  it('should call the parent to change foo', function() {
    component.changeFoo();

    expect(changeFooCallback).to.have.been.calledWith('baz');
  });

  it('should react to new props', function() {
    component.setProps({foo: 42});

    expect(component.foo).to.equal(42);
  });
});
