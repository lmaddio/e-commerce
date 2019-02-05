import { connect } from 'react-redux';
import { startLogout } from 'user/users.actions';
import NavBar from './NavBar';

export default connect(null, { logout: startLogout })(NavBar);
