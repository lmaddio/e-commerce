/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import SetMenuComponent from 'categories/Menu/SubMenu/SubMenu';

jest.mock('categories/Menu/CollapsibleMenu', () => 'CollapsibleMenu');

const categories = [
  {
    name: 'categoryName',
    id: 3,
  },
  {
    name: 'categoryName2',
    id: 2,
  },
];

const categoriesWithSublevels = [
  {
    name: 'categoryName',
    id: 3,
  },
  {
    name: 'categoryName2',
    id: 2,
    sublevels: [
      {
        name: 'categoryName',
        id: 3,
      },
    ],
  },
  {
    name: 'categoryName2',
    id: 5,
    sublevels: [
      {
        name: 'categoryName',
        id: 6,
      },
    ],
  },
];

describe('SetMenuComponent component', () => {
  it('Should render only the childs', () => {
    const wrapper = shallow(
      <SetMenuComponent
        categories={categories}
        depth={0}
      >
        <p>Children</p>
      </SetMenuComponent>,
    );
    expect(wrapper.find('CollapsibleMenu')).toHaveLength(2);
  });

  it('Should render others SetMenuComponent', () => {
    const wrapper = shallow(
      <SetMenuComponent
        categories={categoriesWithSublevels}
        depth={0}
      >
        <p>Children</p>
      </SetMenuComponent>,
    );
    expect(wrapper.find(SetMenuComponent)).toHaveLength(2);
  });
});
