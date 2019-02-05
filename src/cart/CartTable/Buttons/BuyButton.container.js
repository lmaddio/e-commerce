import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { setBuyLoadingState } from '../../cart.actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setBuyLoadingState());
    if (ownProps.onCustomClick) {
      ownProps.onCustomClick();
    }
  },
});

const mergeProps = (stateToProps, dispatchToProps, { onCustomClick, ...onRestProps }) => ({
  ...onRestProps,
  ...dispatchToProps,
});

export default connect(null, mapDispatchToProps, mergeProps)(Button);
