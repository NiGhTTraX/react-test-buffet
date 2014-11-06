var React = require('react'),
    Child = require('./child.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      foo: 'bar',
      stuff: 'tomato'
    };
  },

  render: function() {
    return <div>
      <div ref="stuff">{this.state.stuff}</div>
      <Child ref="child" foo={this.state.foo} callback={this.changeFoo}/>
      <button ref="btn" onClick={this.doStuff}>Do stuff</button>
    </div>;

    var unreachableCode = 2;
  },

  changeFoo: function(newFoo) {
    this.setState({
      foo: newFoo
    });
  },

  doStuff: function() {
    this.setState({
      stuff: 'potato'
    });
  }
});

