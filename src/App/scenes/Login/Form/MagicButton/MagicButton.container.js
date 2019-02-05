import { connect } from 'react-redux';
import { isTokenLoading } from 'token/token.selectors';
import { startLogin } from 'user/users.actions';
import MagicButton from './MagicButton';

const mapStateToProps = state => ({
  isLoading: isTokenLoading(state),
});

export default connect(mapStateToProps, { startLogin })(MagicButton);
