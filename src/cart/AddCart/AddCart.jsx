import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap';
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
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { inCart } = this.props;
    if (prevProps.inCart !== inCart) {
      this.setState({ value: inCart.toString() });
    }
  }

  onChange(event) {
    const { quantity } = this.props;
    const { value } = event.target;
    const intValue = parseInt(value, 10);
    if (intValue < 1) {
      this.setState({ value: '1' });
    } else if (intValue > quantity) {
      this.setState({ value: quantity.toString() });
    } else {
      this.setState({ value });
    }
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
    const { quantity, availableForCart } = this.props;
    const { value } = this.state;
    return (
      <InputGroup className={styles.addCartContainer}>
        <Input
          type="number"
          placeholder="Quantity"
          min="1"
          max={quantity.toString()}
          value={value}
          onChange={this.onChange}
          disabled={!availableForCart}
        />
        <InputGroupAddon addonType="append">
          <Button
            disabled={!availableForCart}
            outline
            color="secondary"
            style={{ maxWidth: '50px' }}
            onClick={this.removeFromCart}
          >
            <img src={cartMinusImage} alt="buy" className={styles.imageInButton} />
          </Button>
          <Button
            disabled={!availableForCart}
            outline
            color="secondary"
            style={{ maxWidth: '50px' }}
            onClick={this.sendToCart}
          >
            <img src={cartPlusImage} alt="buy" className={styles.imageInButton} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
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
