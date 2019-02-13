import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  InputGroupAddon,
  Col,
} from 'reactstrap';
import Button from 'App/components/ThemedButton';
import Input from 'App/components/ThemedInput';
import cartPlusImage from 'images/shopping-cart-add-button.svg';
import cartMinusImage from 'images/shopping-cart-minus-button.svg';
import styles from './AddCart.module.css';

class AddCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.inCart ? props.inCart.toString() : '1',
    };
    this.onChange = this.onChange.bind(this);
    this.sendToCart = this.sendToCart.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { inCart } = this.props;
    if (prevProps.inCart !== inCart) {
      this.updateValue(!inCart ? 1 : inCart);
    }
  }

  onChange(event) {
    const { quantity } = this.props;
    let { value } = event.target;
    const intValue = parseInt(value, 10);
    if (intValue > quantity) {
      value = quantity;
    } else if (intValue < 0) {
      value = 0;
    }
    this.updateValue(value);
  }

  updateValue(value) {
    this.setState({ value: value.toString() });
  }

  removeFromCart() {
    const { removeFromCart, id, inCart } = this.props;
    if (inCart > 0) {
      removeFromCart(id);
    }
  }

  sendToCart() {
    const { sendToCart, inCart, id } = this.props;
    const { value } = this.state;
    const intValue = parseInt(value, 10);
    if (intValue > 0 && intValue !== inCart) {
      sendToCart(id, parseInt(value, 10));
    }
  }

  render() {
    const { quantity, availableForCart, inCart } = this.props;
    const { value } = this.state;
    const isAddButtonDisabled = !availableForCart
      || parseInt(value, 10) < 1 || parseInt(value, 10) === inCart;
    const isRemoveButtonDisabled = !availableForCart || inCart === 0;
    return (
      <div className={styles.cartRow}>
        <Col xs={12} sm={6} className={styles.cartCol}>
          <Input
            type="number"
            placeholder="Quantity"
            max={quantity.toString()}
            value={value}
            onChange={this.onChange}
            disabled={!availableForCart}
          />
        </Col>
        <Col xs={12} sm={6} className={styles.cartCol}>
          <InputGroupAddon addonType="append" className="justify-content-between">
            <Button
              disabled={isRemoveButtonDisabled}
              outline
              className={styles.buttonSize}
              onClick={this.removeFromCart}
            >
              <img src={cartMinusImage} alt="buy" className={styles.imageInButton} />
            </Button>
            <Button
              disabled={isAddButtonDisabled}
              outline
              style={{ maxWidth: '50px' }}
              className={styles.buttonSize}
              onClick={this.sendToCart}
            >
              <img src={cartPlusImage} alt="buy" className={styles.imageInButton} />
            </Button>
          </InputGroupAddon>
        </Col>
      </div>
    );
  }
}

AddCart.defaultProps = {
  inCart: 0,
};

AddCart.propTypes = {
  inCart: PropTypes.number,
  id: PropTypes.string.isRequired,
  availableForCart: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  sendToCart: PropTypes.func.isRequired,
};

export default AddCart;
