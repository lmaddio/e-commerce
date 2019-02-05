/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  ListGroupItem,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import NumberList from 'products/FilterList/Filters/NumberList/NumberList';

describe('NumberList component', () => {
  it('Should render', () => {
    const setValues = () => {};
    const name = 'name';
    const label = 'testLabel';
    const fluid = false;
    const wrapper = shallow(
      <NumberList
        setValues={setValues}
        name={name}
        label={label}
        fluid={fluid}
      />,
    );
    expect(wrapper.find(ListGroupItem)).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual(label);
    expect(wrapper.find(InputGroup)).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(2);

    expect(wrapper.find(InputGroupAddon)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  describe('methods', () => {
    let wrapper = null;
    let instance = null;
    const setValues = jest.fn();
    const name = 'testName';
    const label = 'testLabel';

    beforeEach(() => {
      wrapper = shallow(
        <NumberList
          setValues={setValues}
          name={name}
          label={label}
          fluid
        />,
      );
      instance = wrapper.instance();
    });
    it('onChange', () => {
      expect(wrapper.state()).toEqual({ minValue: '', maxValue: '' });

      instance.onChange({ target: { name: 'min', value: '4' } });
      expect(wrapper.state()).toEqual({ minValue: '4', maxValue: '' });

      instance.onChange({ target: { name: 'max', value: '8' } });
      expect(wrapper.state()).toEqual({ minValue: '4', maxValue: '8' });
    });

    it('isButtonEnable', () => {
      let result = instance.isButtonEnable();
      expect(result).toBeFalsy();

      wrapper.setState({ minValue: '2' });
      result = instance.isButtonEnable();
      expect(result).toBeTruthy();

      wrapper.setProps({ minValue: '2' });
      result = instance.isButtonEnable();
      expect(result).toBeFalsy();

      wrapper.setState({ maxValue: '2' });
      result = instance.isButtonEnable();
      expect(result).toBeTruthy();
    });

    it('setValues should an object and the key must be the name from props', () => {
      instance.setValues();
      expect(setValues.mock.calls[0][0]).toEqual({ testName: { min: null, max: null } });

      wrapper.setState({ minValue: '3' });
      instance.setValues();
      expect(setValues.mock.calls[1][0]).toEqual({ testName: { min: '3', max: null } });

      wrapper.setState({ maxValue: '6' });
      instance.setValues();
      expect(setValues.mock.calls[2][0]).toEqual({ testName: { min: '3', max: '6' } });
    });
  });
});
