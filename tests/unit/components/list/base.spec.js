import React from 'react';
import { spy } from 'sinon';
import List from '../../../../src/components/list.jsx';
import { createSpy } from '../../../helpers/chai-react.js';
import { $render } from '../../../helpers/rendering.js';


describe('List', function() {
  let $component, Item, onSelectSpy;

  beforeEach(function() {
    Item = createSpy({ name: 'Item' });
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
    expect(Item).to.have.been.renderedWith({ id: 3 });
    expect(Item).to.have.been.renderedWith({ id: 2 });
    expect(Item).to.have.been.renderedWith({ id: 1 });
  });

  it('should call the parent when the first item is selected', function() {
    Item.renders[0].onSelect();

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
