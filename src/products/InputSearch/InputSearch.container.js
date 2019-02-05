import { connect } from 'react-redux';
import { setProductsFilter } from '../products.actions';
import InputSearch from './InputSearch';

const mapDispatchToProps = dispatch => ({
  onDelayChange: (id, value) => {
    let params = {};
    if (value) {
      params = { name: value, sublevel_id: id };
    } else {
      params = { name: null, sublevel_id: null };
    }
    dispatch(setProductsFilter(params));
  },
});

export default connect(null, mapDispatchToProps)(InputSearch);
