import { connect } from 'react-redux';
import { cleanFilters } from 'products/products.actions';
import { getCategories } from 'categories/categories.actions';
import Search from './Search';

const mapDispatchToProps = dispatch => ({
  getMinimalData: () => {
    dispatch(cleanFilters());
    dispatch(getCategories());
  },
});

export default connect(null, mapDispatchToProps)(Search);
