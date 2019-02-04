import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { setBuyLoadingState } from '../../cart.actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setBuyLoadingState());
    if (ownProps.callback) {
      ownProps.callback();
    }
  },
});

export default connect(null, mapDispatchToProps)(Button);
