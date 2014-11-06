var React = require('react'),
    Child = React.createFactory(require('../../../src/components/child.jsx')),
    TestUtils = require('react/addons').addons.TestUtils,
    TestHelpers = require('../../helpers.js');


describe('Child', function() {
  var component;


  beforeEach(function() {
    // Since this is a contract test, we mock out the render method.
    TestHelpers.stubMethod(Child, 'render', null);

    component = React.render(Child(), this.container);
  });

  it('should react to new props', function() {
    component.setProps({foo: 42});
    expect(component.foo).to.equal(42);
  });
});

