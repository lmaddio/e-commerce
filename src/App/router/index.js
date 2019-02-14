import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import RedirectLogin from './RedirectLogin';

export const history = createBrowserHistory();

export default {
  PrivateRoute,
  RedirectLogin,
};
