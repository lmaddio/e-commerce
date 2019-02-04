import { connect } from 'react-redux';
import { getItems, getCartState, isCartRequesting } from '../cart.selectors';
import { setBuyLoadingState } from '../cart.actions';
import CartTable from './CartTable';

const mapStateToProps = state => ({
  items: getItems(state),
  error: getCartState(state),
  isLoading: isCartRequesting(state),
});

export default connect(mapStateToProps, { setBuyLoadingState })(CartTable);
