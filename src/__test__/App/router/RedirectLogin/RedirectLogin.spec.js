/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { mount } from 'enzyme';
import RedirectLogin from 'App/router/RedirectLogin/RedirectLogin';

jest.mock('react-router-dom', () => ({
  Route: ({ component: Components }) => <Components location={{ key: 'a' }} />,
  Redirect: 'Redirect',
}));

const Component = () => (<div>Login page!</div>);

describe('RedirectLogin', () => {
  it('Should Component if isLogged is false', () => {
    const wrapper = mount(
      <RedirectLogin
        component={Component}
        isLogged={false}
      />,
    );
    expect(wrapper.find('Route')).toHaveLength(1);
    expect(wrapper.find(Component)).toHaveLength(1);
    expect(wrapper.find('Redirect')).toHaveLength(0);
  });

  it('Should Redirect if isLogged is true', () => {
    const wrapper = mount(
      <RedirectLogin
        component={Component}
        isLogged
      />,
    );
    expect(wrapper.find('Route')).toHaveLength(1);
    expect(wrapper.find(Component)).toHaveLength(0);
    expect(wrapper.find('Redirect')).toHaveLength(1);
  });
});
