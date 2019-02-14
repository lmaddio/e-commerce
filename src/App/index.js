/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { history } from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import App from './App.container';

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

export default Root;
