import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from 'App/components/Alert';
import TableComponents from './TableComponents';
import BuyButton from './Buttons/BuyButton.container';
import HEADER_COLUMNS from './columns';
import styles from './CartTable.module.css';

const BUY_SUCCESS_MESSAGE = 'Thanks for buying!';

class CartTable extends React.Component {
  static renderError(error) {
    const errorMessage = error || 'You don\'t have any product in your cart!';
    return (
      <div className={styles.nonRows}>
        <h5 className="text-center">
          {errorMessage}
        </h5>
        {!error && <Link to="/">Find some!</Link>}
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.clearAlertId = null;
    this.state = {
      internalError: null,
      showAlert: false,
    };
    this.onDismissAlert = this.onDismissAlert.bind(this);
    this.manageAlert = this.manageAlert.bind(this);
    this.onBuyCallback = this.onBuyCallback.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (isLoading && !prevProps.isLoading) {
      this.manageAlert();
    }
  }

  componentWillUnmount() {
    if (this.clearAlertId) {
      clearTimeout(this.clearAlertId);
    }
  }

  onBuyCallback() {
    this.setState({ showAlert: true });
  }

  onDismissAlert() {
    this.setState({ showAlert: false });
  }

  manageAlert() {
    if (this.clearAlertId) {
      clearTimeout(this.clearAlertId);
    }
    this.clearAlertId = setTimeout(this.onDismissAlert, 2000);
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
    this.setState({ internalError: 'There was an error, please try to reload the page' });
  }

  render() {
    const { items, error, isLoading } = this.props;
    const { internalError, showAlert } = this.state;
    return (
      <Fragment>
        <div className={styles.table}>
          <TableComponents.Header columns={HEADER_COLUMNS} />
          {
            items.length > 0
              ? (
                <Fragment>
                  <TableComponents.Row columns={HEADER_COLUMNS} rows={items} />
                </Fragment>
              )
              : CartTable.renderError(internalError)
          }
        </div>
        {
          items.length > 0 && !internalError && (
          <BuyButton
            disabled={isLoading}
            type="button"
            style={{ float: 'right', marginBottom: '1rem' }}
            onCustomClick={this.onBuyCallback}
          >
            Comprar
          </BuyButton>
          )
        }
        {
          showAlert && (
          <Alert
            showAlert={showAlert}
            toggle={this.onDismissAlert}
            color={error ? 'danger' : 'success'}
            message={error || BUY_SUCCESS_MESSAGE}
          />
          )
        }
      </Fragment>
    );
  }
}

CartTable.defaultProps = {
  isLoading: false,
  error: null,
  items: [],
};

CartTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      quantity: PropTypes.number,
      id: PropTypes.string,
    }),
  ),
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CartTable;
