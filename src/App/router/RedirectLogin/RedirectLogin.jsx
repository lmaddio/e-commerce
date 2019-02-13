import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const RedirectLogin = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      !isLogged
        ? <Component {...props} />
        : (
          <Redirect to={{
            pathname: '/',
            state: {
              from: props.location,
            },
          }}
          />
        )
    )}
  />
);

export default RedirectLogin;
