import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


export default class TodoFilter extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    selected: false
  };

  render() {
    const { onSelect, name, selected } = this.props;

    // TODO: use <button> and style it accordingly; <a> is used for now because
    // of the TodoMVC CSS package
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    return <a onClick={onSelect} className={classnames({ selected })}>
      {name}
    </a>;
  }
}
