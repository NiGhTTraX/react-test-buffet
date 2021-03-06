import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    Item: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      // TODO: create an interface for Item
      PropTypes.shape({ id: PropTypes.isRequired })
    ).isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: 'list'
  };

  render() {
    const { className, Item, items, onSelect } = this.props;

    return <ul className={className}>
      {items.map(item => <li className="list-item" key={item.id}>
        <Item {...item} onSelect={() => { onSelect({ id: item.id }); }} />
      </li>)}
    </ul>;
  }
}
