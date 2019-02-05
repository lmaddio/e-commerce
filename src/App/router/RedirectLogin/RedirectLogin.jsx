import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const RedirectLogin = ({ component: Component, isLogged, ...rest }) => (
  <Route
    {...rest}
    component={props => (
      !isLogged
        ? <Component {...props} key={props.location.key} />
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
