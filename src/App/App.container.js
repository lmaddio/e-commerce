import { connect } from 'react-redux';
import { getUserProfile } from 'user/users.actions';
import { getTokenFromCookies } from 'token/token.actions';
import { getUserName } from 'user/users.selectors';
import { hasUserToken } from 'token/token.selectors';
import App from './App';

const mapStateToProps = state => ({
  hasToken: hasUserToken(state),
  userName: getUserName(state),
});

const actions = {
  getUserProfile,
  getTokenFromCookies,
};

export default connect(mapStateToProps, actions)(App);
