var React = require('react'),
    Parent = React.createFactory(require('../../../src/components/parent.jsx')),
    TestUtils = require('react/addons').addons.TestUtils,
    $ = require('jquery');


describe('Parent', function() {
  var component;


  beforeEach(function() {
    component = React.render(Parent(), this.container);
  });

  it('should call to do stuff', function() {
    // TODO: figure out how to mock methods on components
    /*component.doStuff = sinon.spy();
    TestUtils.Simulate.click(component.refs.btn.getDOMNode());
    expect(component.doStuff).to.have.been.called();*/
  });

  it('should render stuff', function() {
    expect($(component.refs.stuff.getDOMNode()).text()).to.equal('tomato');
  });
});

