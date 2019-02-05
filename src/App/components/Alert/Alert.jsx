import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import styles from './Alert.module.css';

const CustomAlert = ({
  showAlert, color, toggle, message,
}) => (
  <Alert
    color={color}
    isOpen={showAlert}
    toggle={toggle}
    transition={{ in: true, timeout: 0 }}
    className={styles.alertPosition}
  >
    {message}
  </Alert>
);

CustomAlert.defaultProps = {
  color: 'danger',
};

CustomAlert.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default CustomAlert;
