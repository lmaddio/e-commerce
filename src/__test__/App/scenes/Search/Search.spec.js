/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Container, Row, Col } from 'reactstrap';
import Search from 'App/scenes/Search/Search';
import SortList from 'products/SortList';
import FilterList from 'products/FilterList';
import ProductList from 'products/ProductList';

describe('Search component', () => {
  it('Render', () => {
    const getMinimalData = jest.fn();
    const wrapper = shallow(
      <Search getMinimalData={getMinimalData} />,
    );
    expect(getMinimalData).toBeCalled();

    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Row)).toHaveLength(1);
    expect(wrapper.find(Col)).toHaveLength(2);
    expect(wrapper.find(SortList)).toHaveLength(1);
    expect(wrapper.find(FilterList)).toHaveLength(1);
    expect(wrapper.find(ProductList)).toHaveLength(1);
  });
});
