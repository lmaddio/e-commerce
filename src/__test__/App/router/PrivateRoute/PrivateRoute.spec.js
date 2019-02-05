/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */
import React from 'react';
import { mount } from 'enzyme';
import PrivateRoute from 'App/router/PrivateRoute/PrivateRoute';

jest.mock('react-router-dom', () => ({
  Route: ({ component: Components }) => <Components location={{ key: 'a' }} />,
  Redirect: 'Redirect',
}));


const Component = () => (<div>Some private component!</div>);

describe('PrivateRoute', () => {
  it('Should render Component if user is logged', () => {
    const wrapper = mount(
      <PrivateRoute
        component={Component}
        isLogged
      />,
    );
    expect(wrapper.find('Route')).toHaveLength(1);
    expect(wrapper.find(Component)).toHaveLength(1);
    expect(wrapper.find('Redirect')).toHaveLength(0);
  });

  it('Should Redirect if isLogged is false', () => {
    const wrapper = mount(
      <PrivateRoute
        component={Component}
        isLogged={false}
      />,
    );
    expect(wrapper.find('Route')).toHaveLength(1);
    expect(wrapper.find(Component)).toHaveLength(0);
    expect(wrapper.find('Redirect')).toHaveLength(1);
  });
});
