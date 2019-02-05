import { connect } from 'react-redux';
import { hasUserToken } from 'token/token.selectors';
import PrivateRoute from './PrivateRoute';

const mapStateToProps = state => ({
  isLogged: Boolean(hasUserToken(state)),
});

export default connect(mapStateToProps)(PrivateRoute);
