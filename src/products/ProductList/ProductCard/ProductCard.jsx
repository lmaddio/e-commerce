import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import { addThousandsSeparator } from 'App/utils';
import styles from './ProductCard.module.css';


class ProductCard extends PureComponent {
  componentDidMount() { // This will make the images funnier
    const { quantity } = this.props;
    this.src = 'http://placekitten.com/g/250/300'.replace(
      '300', Math.floor(quantity / 2),
    );
    this.forceUpdate();
  }

  render() {
    const {
      name, id, price, available, children, Badge,
      sublevel_id: subLevelId, quantity, src,
    } = this.props;
    return (
      <Card key={`${id}.${subLevelId}`} className={styles.card}>
        <div className={styles.imageContainer}>
          <CardImg top width="auto" className={styles.cardImage} src={this.src || ''} alt={src} />
        </div>
        <CardBody className={styles.cardBody}>
          {/* TITLE */}
          <CardTitle className={styles.cardTitle}>
            <h5>
              {name}
              <Badge id={id} style={{ float: 'right' }} />
            </h5>
          </CardTitle>
          {/* PRICE */}
          <CardText className={styles.description}>
            <span className={styles.label}>Price: </span>
            <span>{`$${addThousandsSeparator(price)}`}</span>
          </CardText>
          {/* QUANTITY */}
          <CardText className={styles.description}>
            <span className={styles.label}>Quantity: </span>
            <span>{quantity.toString()}</span>
            {/* MESSAGE IF NOT AVAILABLE */}
            {
              !available
                ? (<span className={styles.noMoreItems}>In Pause</span>)
                : null
            }
          </CardText>
          {children}
        </CardBody>
      </Card>
    );
  }
}

ProductCard.defaultProps = {
  src: 'http://placekitten.com/g/250/300',
  Badge: null,
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  src: PropTypes.string,
  available: PropTypes.bool.isRequired,
  sublevel_id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  Badge: PropTypes.func,
};

export default ProductCard;
