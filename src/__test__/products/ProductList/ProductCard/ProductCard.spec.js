/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import ProductCard from 'products/ProductList/ProductCard/ProductCard';

jest.mock('App/utils', () => ({
  addThousandsSeparator: () => '',
}));

describe('ProductCard component', () => {
  it('Should render', () => {
    const name = 'name';
    const id = 'id';
    const price = 5;
    const available = true;
    const subLevelId = 2;
    const quantity = 1;
    const wrapper = shallow(
      <ProductCard
        name={name}
        id={id}
        price={price}
        available={available}
        sublevel_id={subLevelId}
        Badge={() => <div>Badge</div>}
        quantity={quantity}
      >
        <p>Children</p>
      </ProductCard>,
    );
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.find(CardImg)).toHaveLength(1);
    expect(wrapper.find(CardBody)).toHaveLength(1);
    expect(wrapper.find(CardTitle)).toHaveLength(1);

    expect(wrapper.find('h5').text()).toEqual(`${name}<Badge />`);

    expect(wrapper.find('span')).toHaveLength(4);
    expect(wrapper.find(CardText)).toHaveLength(2);

    wrapper.setProps({ available: false });

    expect(wrapper.find('span')).toHaveLength(5);
    expect(wrapper.find('span').at(4).text()).toEqual('In Pause');
  });
});
