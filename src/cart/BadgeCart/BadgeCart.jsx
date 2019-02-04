import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';

const BadgeCart = ({ inCart, dispatch, ...restProps }) => (
  <Badge color="secondary" {...restProps}>{inCart.toString()}</Badge>
);

BadgeCart.defaultProps = {
  inCart: 0,
};

BadgeCart.propTypes = {
  inCart: PropTypes.number,
};

export default BadgeCart;
