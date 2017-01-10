import React from 'react';
import ReactDOM from 'react-dom';
import { spy } from 'sinon';
import List from '../../../../src/components/list.jsx';
import { fakeComponentFactory } from '../../../helpers/chai-react.js';
import { render } from '../../../helpers/rendering.js';


describe('List', function() {
  let component, Item, onSelectSpy;

  beforeEach(function() {
    Item = fakeComponentFactory({ name: 'Item' });
    onSelectSpy = spy();

    component = render(<List
      className="test-class"
      Item={Item}
      items={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      onSelect={onSelectSpy}
    />);
  });

  it('should apply the given class name', function() {
    expect(ReactDOM.findDOMNode(component).className).to.contain('test-class');
  });

  it('should render the given items', function() {
    expect(Item).to.have.been.renderedWith({ id: 1 });
    expect(Item).to.have.been.renderedWith({ id: 2 });
    expect(Item).to.have.been.renderedWith({ id: 3 });
  });

  it('should call the parent when the first item is selected', function() {
    Item.props[0].onSelect();

    expect(onSelectSpy).to.have.been.calledWith({ index: 0 });
  });

  it('should call the parent when the last item is selected', function() {
    Item.lastPropsReceived.onSelect();

    expect(onSelectSpy).to.have.been.calledWith({ index: 2 });
  });

  it('should call the parent when any item is selected', function() {
    Item.props[1].onSelect();

    expect(onSelectSpy).to.have.been.calledWith({ index: 1 });
  });
});
