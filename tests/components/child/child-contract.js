var React = require('react'),
    Child = React.createFactory(require('../../../src/components/child.jsx')),
    TestUtils = require('react/addons').addons.TestUtils;


describe('Child', function() {
  var component;


  beforeEach(function() {
    component = React.render(Child(), this.container);
  });

  it('should react to new props', function() {
    component.setProps({foo: 42});
    expect(component.foo).to.equal(42);
  });
});

