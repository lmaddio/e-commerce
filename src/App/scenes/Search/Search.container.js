import { connect } from 'react-redux';
import { getProducts } from 'products/products.actions';
import { getCategories } from 'categories/categories.actions';
import Search from './Search';

const mapDispatchToProps = dispatch => ({
  getMinimalData: () => {
    dispatch(getProducts());
    dispatch(getCategories());
  },
});

export default connect(null, mapDispatchToProps)(Search);
