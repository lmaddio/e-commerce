/* eslint react/jsx-filename-extension: 0 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import App from './App.container';

const Root = () => (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

export default Root;
