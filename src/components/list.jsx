import React, { Component, PropTypes } from 'react';


export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    Item: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired })
    ).isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: 'list'
  };

  render() {
    const { className, Item, items, onSelect } = this.props;

    return <ul className={className}>
      {items.map(item =>
        <li key={item.id}>
          <Item {...item} onSelect={() => { onSelect({ id: item.id }); }} />
        </li>
      )}
    </ul>;
  }
}
