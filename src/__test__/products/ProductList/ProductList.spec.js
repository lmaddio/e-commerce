/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Spinner } from 'reactstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductList, { NotFound, NoMoreProducts, Loading } from 'products/ProductList/ProductList';

jest.mock('cart/AddCart', () => 'AddCart');
jest.mock('cart/BadgeCart', () => 'BadgeCart');
jest.mock('products/ProductList/ProductCard', () => 'ProductCard');

const props = {
  products: [
    {
      name: 'name1',
      id: 'id1',
      price: 10,
      available: true,
      quantity: 1,
      inCart: 'inCart1',
    },
    {
      name: 'name2',
      id: 'id2',
      price: 20,
      available: false,
      quantity: 2,
      inCart: 'inCart2',
    },
  ],
  error: 'There was an error',
  isLoading: false,
  pagination: {
    limit: 10,
    page: 1,
    lastPage: 2,
  },
  setPagination: jest.fn(),
};

describe('Named Exports', () => {
  it('NotFound', () => {
    const wrapper = shallow(
      <NotFound />,
    );
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('h2').text()).toEqual('Sorry, no products found.');
  });

  it('NoMoreProducts', () => {
    const wrapper = shallow(
      <NoMoreProducts />,
    );
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('b')).toHaveLength(1);
    expect(wrapper.find('b').text()).toEqual('There are no more products to show');

    wrapper.setProps({ message: 'custom message' });
    expect(wrapper.find('b').text()).toEqual('custom message');
  });

  it('Loading', () => {
    const wrapper = shallow(
      <Loading />,
    );
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});

describe('ProductList component', () => {
  describe('render', () => {
    it('isLoading -> Snipper', () => {
      const wrapper = shallow(
        <ProductList {...props} isLoading error={undefined} />,
      );
      expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('No products -> NotFound message', () => {
      const wrapper = shallow(
        <ProductList {...props} products={[]} />,
      );
      expect(wrapper.find(NotFound)).toHaveLength(1);
    });

    it('With products -> InfiniteScroll', () => {
      const wrapper = shallow(
        <ProductList {...props} />,
      );
      expect(wrapper.find(InfiniteScroll)).toHaveLength(1);
      expect(wrapper.find('ProductCard')).toHaveLength(props.products.length);
      expect(wrapper.find('AddCart')).toHaveLength(props.products.length);
    });
  });

  describe('methods', () => {
    it('static setPagination function', () => {
      const callback = jest.fn();
      const newFunction = ProductList.setPagination(callback, [2]);
      newFunction();
      expect(callback).toBeCalled();
      expect(callback.mock.calls[0][0]).toEqual([2]);
    });
  });
});
