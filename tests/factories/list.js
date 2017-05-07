import React from 'react';
import { times, random } from 'lodash';
import { Factory } from 'rosie';


const item = new Factory()
  .sequence('id')
  .attr('name', ['id'], id => `Item #${id}`);

const Item = ({ name, onSelect }) => <div onClick={onSelect}>
  {name}
</div>;

const many = (factory, num, records = times(num, () => ({ }))) =>
  records.map(data => factory.attributes(data));


export default new Factory()
  .option('numItems', random(1, 20))
  .attr('items', ['numItems', 'items'], (numItems, items) =>
    many(item, numItems, items)
  )
  .attrs({
    Item: () => Item,
    onSelect: () => ({ id }) => { console.log(`You selected ${id}`); }
  });
