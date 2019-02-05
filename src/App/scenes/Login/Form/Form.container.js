import { connect } from 'react-redux';
import { isTokenLoading } from 'token/token.selectors';
import { getLoginError } from 'user/users.selectors';
import { startLogin } from 'user/users.actions';
import Form from './Form';

const mapStateToProps = state => ({
  isLoading: isTokenLoading(state),
  loginError: getLoginError(state),
});

export default connect(mapStateToProps, { startLogin })(Form);
