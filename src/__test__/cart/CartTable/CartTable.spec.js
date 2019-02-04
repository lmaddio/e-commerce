/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import CartTable from 'cart/CartTable/CartTable';

jest.mock('react-router-dom', () => ({
  Link: () => 'Link',
}));
jest.mock('App/components/common/Alert', () => 'Alert');
jest.mock('cart/CartTable/TableComponents', () => ({
  Header: () => 'Header',
  Row: () => 'Row',
}));
jest.mock('cart/CartTable/Buttons/BuyButton.container', () => 'BuyButton');
jest.mock('cart/CartTable/columns', () => [
  {
    title: 'title1',
    className: 'className1',
  },
  {
    className: 'className2',
  },
  {
    title: 'title3',
    className: 'className3',
  },
]);
jest.mock('cart/CartTable/CartTable.module.css', () => ({
  nonRows: 'nonRows',
  row: 'row',
  table: 'table',
  header: 'header',
}));

const items = [
  {
    price: 222,
    quantity: 2,
    id: 'idTest',
  },
];

describe('CartTable component', () => {
  describe('render', () => {
    it('Should render message and no button', () => {
      const wrapper = shallow(
        <CartTable isLoading />,
      );
      expect(wrapper.find('Header')).toHaveLength(1);
      // No items so it renders a message
      expect(wrapper.find('h5')).toHaveLength(1);
      expect(wrapper.find('Link')).toHaveLength(1);
      expect(wrapper.find('BuyButton')).toHaveLength(0);
      expect(wrapper.find('Alert')).toHaveLength(0);
      expect(wrapper.find('Row')).toHaveLength(0);
    });

    it('Should render rows and button', () => {
      const wrapper = shallow(
        <CartTable items={items} />,
      );
      expect(wrapper.find('Header')).toHaveLength(1);
      // No items so it renders a message
      expect(wrapper.find('Row')).toHaveLength(1);

      expect(wrapper.find('h5')).toHaveLength(0);
      expect(wrapper.find('Link')).toHaveLength(0);
      expect(wrapper.find('BuyButton')).toHaveLength(1);
      expect(wrapper.find('Alert')).toHaveLength(0);
    });

    it('Should render an Alert', () => {
      const wrapper = shallow(
        <CartTable items={items} error="error" />,
      );
      wrapper.setState({ showAlert: true });
      expect(wrapper.find('Alert')).toHaveLength(1);
    });
  });
  describe('static renderError', () => {
    it('Should not render a Link', () => {
      const Component = CartTable.renderError('custom error');
      const wrapper = shallow(Component);
      expect(wrapper.find('Link')).toHaveLength(0);
      expect(wrapper.find('h5')).toHaveLength(1);
      expect(wrapper.find('h5').text()).toEqual('custom error');
    });

    it('Should render constant message', () => {
      const Component = CartTable.renderError();
      const wrapper = shallow(Component);
      expect(wrapper.find('Link')).toHaveLength(1);
      expect(wrapper.find('h5')).toHaveLength(1);
      expect(wrapper.find('h5').text()).toEqual('You don\'t have any product in your cart!');
    });
  });

  describe('Managing state', () => {
    let wrapper = null;
    beforeEach(() => {
      wrapper = shallow(
        <CartTable
          items={items}
          isLoading
        />,
      );
    });
    it('onDismissAlert', () => {
      const instance = wrapper.instance();
      wrapper.setState({ showAlert: true });
      expect(wrapper.state()).toEqual({ internalError: null, showAlert: true });
      instance.onDismissAlert();
      expect(wrapper.state()).toEqual({ internalError: null, showAlert: false });
    });

    it('manageAlert', () => {
      const instance = wrapper.instance();
      expect(instance.clearAlertId).toEqual(null);

      instance.manageAlert();
      expect(instance.clearAlertId).toBeTruthy();
    });
  });
});
