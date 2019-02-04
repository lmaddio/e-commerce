import { connect } from 'react-redux';
import getCategories from '../categories.selectors';
import Menu from './Menu';

const mapStateToProps = state => ({
  categories: getCategories(state),
});

export default connect(mapStateToProps)(Menu);
