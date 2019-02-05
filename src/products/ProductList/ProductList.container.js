import { connect } from 'react-redux';
import {
  getProductsItems, getProductsState, isSearching, getPagination,
} from '../products.selectors';
import { setPagination } from '../products.actions';
import ProductList from './ProductList';

const mapStateToProps = state => ({
  products: getProductsItems(state),
  isLoading: isSearching(state),
  pagination: getPagination(state),
  error: getProductsState(state),
});

export default connect(mapStateToProps, { setPagination })(ProductList);
