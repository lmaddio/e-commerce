/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  ListGroupItem,
  Input,
} from 'reactstrap';
import CheckboxList, { onInputChange } from 'products/FilterList/Filters/CheckboxList/CheckboxList';

jest.mock('products/FilterList/Filters/CheckboxList/CheckboxList.module.css', () => ({
  list: 'list',
  fluid: 'fluid',
  toRight: 'toRight',
}));

describe('CheckboxList component', () => {
  it('Should render with certain classes', () => {
    const onChange = () => {};
    const name = 'name';
    const label = 'testLabel';
    const value = true;
    const fluid = false;
    const checkboxToLeft = false;
    const wrapper = shallow(
      <CheckboxList
        onChange={onChange}
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        checkboxToLeft={checkboxToLeft}
      />,
    );
    expect(wrapper.find(ListGroupItem)).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual(label);
    expect(wrapper.find(Input)).toHaveLength(1);

    expect(wrapper.find('.fluid')).toHaveLength(0);
    expect(wrapper.find('.toRight')).toHaveLength(1);
  });

  it('Should render other classes when props are different', () => {
    const onChange = () => {};
    const name = 'name';
    const label = 'testLabel';
    const value = true;
    const fluid = true;
    const checkboxToLeft = true;
    const wrapper = shallow(
      <CheckboxList
        onChange={onChange}
        name={name}
        label={label}
        value={value}
        fluid={fluid}
        checkboxToLeft={checkboxToLeft}
      />,
    );
    expect(wrapper.find(ListGroupItem)).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual(label);
    expect(wrapper.find(Input)).toHaveLength(1);

    expect(wrapper.find('.fluid')).toHaveLength(1);
    expect(wrapper.find('.toRight')).toHaveLength(0);
  });

  it('onInputChange function', () => {
    const callback = jest.fn();
    const newFunction = onInputChange(callback, [2]);
    newFunction();
    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).toEqual([2]);
  });
});
