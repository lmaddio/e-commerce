import { connect } from 'react-redux';
import { hasUserToken } from 'token/token.selectors';
import RedirectLogin from './RedirectLogin';

const mapStateToProps = state => ({
  isLogged: hasUserToken(state),
});

export default connect(mapStateToProps)(RedirectLogin);
