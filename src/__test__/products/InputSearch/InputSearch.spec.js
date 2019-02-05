/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Input } from 'reactstrap';
import InputSearch from 'products/InputSearch/InputSearch';

jest.useFakeTimers();

describe('InputSearch component', () => {
  it('Should render', () => {
    const onDelayChange = () => {};
    const id = 66;
    const wrapper = shallow(
      <InputSearch
        onDelayChange={onDelayChange}
        id={id}
      />,
    );
    expect(wrapper.find(Input)).toHaveLength(1);
  });

  describe('methods', () => {
    let wrapper = null;
    let instance = null;
    const onDelayChange = () => {};
    const id = 66;

    beforeEach(() => {
      wrapper = shallow(
        <InputSearch
          onDelayChange={onDelayChange}
          id={id}
        />,
      );
      instance = wrapper.instance();
    });

    it('onChange', () => {
      expect(wrapper.state()).toEqual({ value: '' });
      expect(instance.timerId).toBe(null);

      instance.onChange({ target: { value: '4' } });
      expect(wrapper.state()).toEqual({ value: '4' });

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(instance.timerId).toBeTruthy();

      instance.onChange({ target: { value: '5' } });
      expect(wrapper.state()).toEqual({ value: '5' });
      expect(clearTimeout).toHaveBeenCalledWith(instance.onDelayChange);
      expect(setTimeout).toHaveBeenCalledTimes(2);
    });

    it('onDelayChange call prop function with value of state', () => {
      const onDelayChangeMock = jest.fn();
      wrapper.setProps({ onDelayChange: onDelayChangeMock });
      wrapper.setState({ value: '5' });

      instance.onDelayChange();
      expect(onDelayChangeMock.mock.calls[0][0]).toEqual(66);
      expect(onDelayChangeMock.mock.calls[0][1]).toEqual('5');
    });

    it('componentWillUnmount not call clearTimeout', () => {
      clearTimeout.mockReset();
      expect(instance.timerId).toBe(null);
      instance.componentWillUnmount();
      expect(clearTimeout).not.toBeCalled();
    });

    it('componentWillUnmount will call clearTimeout', () => {
      expect(instance.timerId).toBeFalsy();

      instance.onChange({ target: { value: '5' } });
      expect(instance.timerId).toBeTruthy();

      instance.componentWillUnmount();
      expect(clearTimeout).toBeCalled();
    });
  });
});
