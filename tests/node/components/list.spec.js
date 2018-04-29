import React from 'react';
import { spy } from 'sinon';
import List from '../../../src/components/list.jsx';
import { createReactStub } from '../helpers/chai-react';
import { describe, it, beforeEach, expect, $render } from '../suite';


describe('List', function() {
  let $component, Item, onSelectSpy;

  beforeEach(function() {
    Item = createReactStub();

    Item.withProps({ id: 1 }).renders('item 1');
    Item.withProps({ id: 2 }).renders('item 2');
    Item.withProps({ id: 3 }).renders('item 3');

    onSelectSpy = spy();

    $component = $render(<List
      className="test-class"
      Item={Item}
      items={[{ id: 3 }, { id: 2 }, { id: 1 }]}
      onSelect={onSelectSpy}
    />);
  });

  it('should apply the given class name', function() {
    expect($component.attr('class')).to.contain('test-class');
  });

  it('should render the given items', function() {
    expect($component.find('.list-item').text()).to.equal(
      ['item 3', 'item 2', 'item 1'].join('')
    );
  });

  it('should call the parent when the first item is selected', function() {
    Item.firstProps.onSelect();

    expect(onSelectSpy).to.have.been.calledWith({ id: 3 });
  });

  it('should call the parent when the last item is selected', function() {
    Item.lastProps.onSelect();

    expect(onSelectSpy).to.have.been.calledWith({ id: 1 });
  });

  it('should call the parent when any item is selected', function() {
    Item.renders[1].onSelect();

    expect(onSelectSpy).to.have.been.calledWith({ id: 2 });
  });
});
