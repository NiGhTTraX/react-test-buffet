var React = require('react'),
    Child = require('../../../src/components/child.jsx'),
    TestUtils = require('react/addons').addons.TestUtils,
    sinon = require('sinon');


describe('Child', function() {
  var component;
  var changeFooCallback;


  beforeEach(function() {
    changeFooCallback = sinon.spy();

    component = React.render(<Child callback={changeFooCallback} />,
                             this.container);
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


