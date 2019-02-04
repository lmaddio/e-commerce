import { connect } from 'react-redux';
import { setItemToSaga, removeItem } from '../cart.actions';
import { getItemById } from '../cart.selectors';
import AddCart from './AddCart';

const mapStateToProps = (state, ownProps) => {
  const item = getItemById(ownProps.id)(state) || {};
  return {
    inCart: item.quantity,
  };
};

const actions = {
  sendToCart: setItemToSaga,
  removeFromCart: removeItem,
};

export default connect(mapStateToProps, actions)(AddCart);
