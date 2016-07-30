import React from 'react';
import Child from './child.jsx';
import { Component } from 'react-component-tree';


export default class Parent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foo: 'bar',
      stuff: 'tomato'
    };
  }

  render() {
    return <div>
      <div ref="stuff">{this.state.stuff}</div>
      {this.loadChild('child')}
      <button ref="btn" onClick={this.doStuff}>Do stuff</button>
    </div>;

    const unreachableCode = 2;
  }

  get children() {
    return {
      child: function() {
        return {
          component: Child,
          foo: this.state.foo,
          callback: this.changeFoo
        };
      }
    }
  }


  changeFoo(newFoo) {
    this.setState({
      foo: newFoo
    });
  }

  doStuff() {
    this.setState({
      stuff: 'potato'
    });
  }
};
