/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'reactstrap';
import TitleWithCloseButton from 'App/components/TitleWithCloseButton/TitleWithCloseButton';

describe('TitleWithCloseButton component', () => {
  it('Render', () => {
    const title = 'title';
    const wrapper = shallow(
      <TitleWithCloseButton
        title={title}
        onClickTitle={() => {}}
        onClickClean={() => {}}
      />,
    );
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual(title);
  });
});
