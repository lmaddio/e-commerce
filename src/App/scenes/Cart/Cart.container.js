import { connect } from 'react-redux';
import { setProductsFilter } from 'products/products.actions';
import { isSearching } from 'products/products.selectors';
import { getItems } from 'cart/cart.selectors';
import Cart from './Cart';

const mapStateToProps = state => ({
  items: getItems(state),
  isLoading: isSearching(state),
});

const mergeProps = (stateToProps, dispatchProps, ownProps) => {
  const { items, isLoading } = stateToProps;
  let getProductsData = () => {};
  if (items.length > 0) {
    getProductsData = () => {
      const ids = stateToProps.items.map(item => item.id);
      dispatchProps.setProductsFilter({ id: ids });
    };
  }
  return {
    ...ownProps,
    hasItems: items.length > 0,
    isLoading,
    getProductsData,
  };
};

export default connect(mapStateToProps, { setProductsFilter }, mergeProps)(Cart);
