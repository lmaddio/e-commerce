import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Login from './scenes/Login';
import Search from './scenes/Search';
import Cart from './scenes/Cart';
import FullLoader from './components/FullLoader';
import AppRouter from './router';

const FunnyMessage = lazy(() => import('./components/FunnyMessage'));

const SuspenseFunnyMessage = () => (
  <Suspense fallback={<FullLoader />}>
    <FunnyMessage />
  </Suspense>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidMount() {
    const { getTokenFromCookies } = this.props;
    getTokenFromCookies();
  }

  componentDidUpdate(prevProps) {
    const {
      hasToken, userName, getUserProfile,
    } = this.props;
    if (!prevProps.hasToken && hasToken && !userName) {
      getUserProfile();
    }
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { hasToken } = this.props;
    const { error } = this.state;
    if (error) {
      return (<SuspenseFunnyMessage />);
    }
    return (
      <Router>
        <div>
          <AppRouter.RedirectLogin
            path="/login"
            exact
            isLogged={hasToken}
            component={Login}
          />
          <AppRouter.PrivateRoute
            path="/"
            exact
            isLogged={hasToken}
            component={Search}
          />
          <AppRouter.PrivateRoute
            path="/cart"
            isLogged={hasToken}
            component={Cart}
          />
        </div>
      </Router>
    );
  }
}

App.defaultProps = {
  hasToken: false,
  userName: '',
};

App.propTypes = {
  hasToken: PropTypes.bool,
  userName: PropTypes.string,
  getUserProfile: PropTypes.func.isRequired,
  getTokenFromCookies: PropTypes.func.isRequired,
};

export default App;
