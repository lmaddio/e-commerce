/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap';
import AddCart from 'cart/AddCart/AddCart';

describe('AddCart component', () => {
  let wrapper = null;
  const removeFromCart = jest.fn();
  const sendToCart = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <AddCart
        id="id0"
        availableForCart
        quantity={1}
        removeFromCart={removeFromCart}
        sendToCart={sendToCart}
      />,
    );
  });
  it('Should render basic components', () => {
    expect(wrapper.find(InputGroup)).toHaveLength(1);
    expect(wrapper.find(InputGroupAddon)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find('img')).toHaveLength(2);
  });

  it('Should call this.setState if inCart prop changes', () => {
    wrapper.setProps({ inCart: 4 });
    expect(wrapper.state()).toEqual({ value: '4' });

    wrapper.setProps({ inCart: 6 });
    expect(wrapper.state()).toEqual({ value: '6' });
  });

  it('Should call removeFromCart if prop inCart is more than 0', () => {
    const instance = wrapper.instance();
    wrapper.setProps({ inCart: 0 });

    instance.removeFromCart();
    expect(removeFromCart.mock.calls.length).toBe(0);

    wrapper.setProps({ inCart: 1 });
    instance.removeFromCart();
    expect(removeFromCart).toBeCalled();
    expect(removeFromCart.mock.calls[0][0]).toBe('id0');
  });

  it('Should call sendToCart if prop inCart is different than state', () => {
    const instance = wrapper.instance();
    wrapper.setProps({ inCart: 1 });

    instance.sendToCart();
    expect(sendToCart.mock.calls.length).toBe(0);

    wrapper.setState({ value: '2' });
    instance.sendToCart();
    expect(sendToCart).toBeCalled();
    expect(sendToCart.mock.calls[0][0]).toBe('id0');
    expect(sendToCart.mock.calls[0][1]).toBe(2);
  });

  describe('onChange method', () => {
    beforeEach(() => {
      wrapper = shallow(
        <AddCart
          id="id0"
          quantity={8}
          inCart={5}
          availableForCart={false}
          removeFromCart={removeFromCart}
          sendToCart={sendToCart}
        />,
      );
    });
    it('Should set minimum state', () => {
      const instance = wrapper.instance();

      expect(wrapper.state()).toEqual({ value: '5' });
      instance.onChange({ target: { value: '0' } });

      expect(wrapper.state()).toEqual({ value: '1' });
    });

    it('Should set quantity as maximum state', () => {
      const instance = wrapper.instance();

      expect(wrapper.state()).toEqual({ value: '5' });
      instance.onChange({ target: { value: '10' } });

      expect(wrapper.state()).toEqual({ value: '8' });
    });

    it('Should set value from target if no other condition passed', () => {
      const instance = wrapper.instance();

      expect(wrapper.state()).toEqual({ value: '5' });
      instance.onChange({ target: { value: '4' } });

      expect(wrapper.state()).toEqual({ value: '4' });
    });
  });
});
