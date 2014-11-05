var React = require('react'),
    Parent = React.createFactory(
        require('../../../src/components/parent.jsx')),
    TestUtils = require('react/addons').addons.TestUtils;


describe('Parent', function() {
  var component;


  beforeEach(function() {
    component = React.render(Parent(), this.container);
  });

  it('should send props', function() {
    // TODO: figure out how to test that a component received the right props
  });
});

