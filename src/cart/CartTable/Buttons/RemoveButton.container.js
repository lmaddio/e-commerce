import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { removeItem } from '../../cart.actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(removeItem(ownProps.id)),
});

export default connect(null, mapDispatchToProps)(Button);
