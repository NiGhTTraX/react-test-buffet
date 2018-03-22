import React from 'react';
import { spy } from 'sinon';
import { Simulate } from 'react-dom/test-utils';
import TodoFilter from '../../../src/components/todo-filter.jsx';
import { describe, it, beforeEach, expect, $render } from '../suite';


describe('TodoFilter', function() {
  let $filter, onSelect;

  beforeEach(function() {
    onSelect = spy();
  });

  describe('not selected', function() {
    beforeEach(function() {
      $filter = $render(<TodoFilter
        name="awesome filter"
        onSelect={onSelect}
      />);
    });

    it('should render the filter name', function() {
      expect($filter.text()).to.equal('awesome filter');
    });

    it('should call back when selecting the filter', function() {
      Simulate.click($filter[0]);

      expect(onSelect).to.have.been.called;
    });

    it('should not apply selected styles if not selected', function() {
      expect($filter.hasClass('selected')).to.be.false;
    });
  });

  describe('selected', function() {
    beforeEach(function() {
      $filter = $render(<TodoFilter
        name="awesome filter"
        selected
        onSelect={onSelect}
      />);
    });

    it('should apply selected styles if selected', function() {
      expect($filter.hasClass('selected')).to.be.true;
    });
  });
});
