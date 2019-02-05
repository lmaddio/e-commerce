import { connect } from 'react-redux';
import { getFilters, isSearching } from '../products.selectors';
import { setProductsFilter, cleanFilters } from '../products.actions';
import FilterList from './FilterList';

const mapStateToProps = state => ({
  usedFilters: getFilters(state),
  disableAllFilters: isSearching(state),
});

const actions = {
  setProductsFilter,
  cleanFilters,
};

export default connect(mapStateToProps, actions)(FilterList);
