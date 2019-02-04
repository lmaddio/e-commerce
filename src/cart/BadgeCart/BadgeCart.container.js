import { connect } from 'react-redux';
import { getItemById } from '../cart.selectors';
import BadgeCart from './BadgeCart';

const mapStateToProps = (state, ownProps) => {
  const item = getItemById(ownProps.id)(state) || {};
  return {
    inCart: item.quantity || 0,
  };
};

export default connect(mapStateToProps, null)(BadgeCart);
