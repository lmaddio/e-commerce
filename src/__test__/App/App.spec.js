/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import App from 'App/App';

jest.mock('App/scenes/Login', () => 'Login');
jest.mock('App/scenes/Search', () => 'Search');
jest.mock('App/scenes/Cart', () => 'Cart');
jest.mock('App/router', () => ({
  RedirectLogin: () => (<div>RedirectLogin</div>),
  PrivateRoute: () => (<div>PrivateRoute</div>),
}));

describe('App component', () => {
  let wrapper = null;
  let instance = null;
  const hasToken = true;
  let getUserProfile = jest.fn();
  let getTokenFromCookies = jest.fn();

  beforeEach(() => {
    getUserProfile = jest.fn();
    getTokenFromCookies = jest.fn();
    wrapper = shallow(
      <App
        hasToken={hasToken}
        getUserProfile={getUserProfile}
        getTokenFromCookies={getTokenFromCookies}
      />,
    );
    instance = wrapper.instance();
  });
  it('Should render routes', () => {
    expect(wrapper.find(Router)).toHaveLength(1);
    expect(wrapper.find('RedirectLogin')).toHaveLength(1);
    expect(wrapper.find('PrivateRoute')).toHaveLength(2);
  });

  it('componentDidMount', () => {
    expect(getTokenFromCookies).toBeCalled();
  });

  it('componentDidUpdate', () => {
    instance.componentDidUpdate({ hasToken: false });
    expect(getUserProfile).toBeCalled();
  });
});
