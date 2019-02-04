/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import Header from 'cart/CartTable/TableComponents/Header';

const columns = [
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
];

describe('Header component', () => {
  it('Should inCart props as label', () => {
    const wrapper = shallow(
      <Header columns={columns} />,
    );
    expect(wrapper.find('div')).toHaveLength(columns.length);
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('span').at(0).text()).toEqual('title1');
  });
});
