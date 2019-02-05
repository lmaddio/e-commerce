import { connect } from 'react-redux';
import { getActualSort, isSearching } from '../products.selectors';
import { setProductsSort, cleanProductsSort } from '../products.actions';
import { SORT_TYPES } from '../products.constants';
import SortList from './SortList';

const mapStateToProps = state => ({
  sort: getActualSort(state),
  sortTypes: SORT_TYPES,
  isLoading: isSearching(state),
});

const actions = {
  setProductsSort,
  cleanProductsSort,
};

export default connect(mapStateToProps, actions)(SortList);
