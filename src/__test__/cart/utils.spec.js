/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { mount } from 'enzyme';
import PassPropsToComponent from 'cart/utils';

describe('PassPropsToComponent util', () => {
  it('Should pass props to Component', () => {
    const Component = ({ label }) => (<div>{label}</div>);
    const TEXT = 'This rocks';
    const NewComponent = PassPropsToComponent(Component, { label: TEXT });
    const wrapper = mount(<span>{NewComponent}</span>);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').text()).toEqual(TEXT);
  });
});
