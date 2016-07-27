var React = require('react'),
    Child = require('./child.jsx'),
    ComponentTree = require('react-component-tree');


module.exports = React.createClass({
  mixins: [ComponentTree.Mixin],

  children: {
    child: function() {
      return {
        component: Child,
        foo: this.state.foo,
        callback: this.changeFoo
      };
    }
  },

  getInitialState: function() {
    return {
      foo: 'bar',
      stuff: 'tomato'
    };
  },

  render: function() {
    return <div>
      <div ref="stuff">{this.state.stuff}</div>
      {this.loadChild('child')}
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

