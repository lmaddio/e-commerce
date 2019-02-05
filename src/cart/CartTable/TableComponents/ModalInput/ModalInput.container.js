import { connect } from 'react-redux';
import { getProductsItemById } from 'products/products.selectors';
import { setItemToSaga } from '../../../cart.actions';
import ModalInput from './ModalInput';

const mapStateToProps = (state, ownProps) => ({
  product: getProductsItemById(ownProps.id)(state),
});

export default connect(mapStateToProps, { sendValueToStore: setItemToSaga })(ModalInput);
