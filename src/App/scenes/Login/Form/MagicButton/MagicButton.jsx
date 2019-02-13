import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'reactstrap';
import { getValidEmail, getValidPassword } from '../../fields';

const MagicButton = ({ startLogin, isLoading }) => (
  <Button
    color="success"
    style={{ float: 'right' }}
    onClick={() => startLogin(getValidEmail(), getValidPassword())}
  >
    Just log me
    {' '}
    {
      isLoading
        ? <Spinner size="sm" color="secondary" />
        : null
    }
  </Button>
);

MagicButton.defaultProps = {
  isLoading: false,
};

MagicButton.propTypes = {
  startLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default MagicButton;
