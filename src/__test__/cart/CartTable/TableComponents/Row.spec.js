/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import Row from 'cart/CartTable/TableComponents/Row';

const columns = [
  {
    property: 'text',
    className: 'className1',
  },
  {
    property: 'id',
  },
  {
    property: '',
    format: () => 'format test',
  },
];

const rows = [
  {
    id: 'something1',
    text: 'text1',
  },
  {
    id: 'something2',
    text: 'text2',
  },
  {
    id: 'something3',
    text: 'text3',
  },
];

describe('Row component', () => {
  it('Should render one row per item in rows array', () => {
    const wrapper = shallow(
      <Row columns={columns} rows={rows} />,
    );
    // One div per Row (3), One div per Column * One div per Row (3*3)
    expect(wrapper.find('div')).toHaveLength(rows.length * columns.length + (rows.length));
    expect(wrapper.find('span')).toHaveLength(9);
    // First row
    expect(wrapper.find('span').at(0).text()).toEqual('text1');
    expect(wrapper.find('span').at(1).text()).toEqual('something1');
    expect(wrapper.find('span').at(2).text()).toEqual('format test');

    // Second Row
    expect(wrapper.find('span').at(3).text()).toEqual('text2');
    expect(wrapper.find('span').at(4).text()).toEqual('something2');
    expect(wrapper.find('span').at(5).text()).toEqual('format test');

    // Third Row
    expect(wrapper.find('span').at(6).text()).toEqual('text3');
    expect(wrapper.find('span').at(7).text()).toEqual('something3');
    expect(wrapper.find('span').at(8).text()).toEqual('format test');
  });
});
