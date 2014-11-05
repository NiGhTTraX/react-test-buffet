var React = require('react'),
    Parent = React.createFactory(require('../../../src/components/parent.jsx')),
    TestUtils = require('react/addons').addons.TestUtils,
    TestHelpers = require('../../helpers.js');


describe('Parent', function() {
  var component;


  beforeEach(function() {
    TestHelpers.stubMethod(Parent, 'render', null);

    component = React.render(Parent(), this.container);
  });

  it('should set initial foo', function() {
    expect(component.state.foo).to.equal('bar');
  });

  it('should set initial stuff', function() {
    expect(component.state.stuff).to.equal('tomato');
  });

  it('should change foo when asked to', function() {
    component.changeFoo('baz');
    expect(component.state.foo).to.equal('baz');
  });

  it('should do stuff when asked to', function() {
    component.doStuff();
    expect(component.state.stuff).to.equal('potato');
  });
});

