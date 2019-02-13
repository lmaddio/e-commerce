import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroupItem,
  Input,
} from 'reactstrap';
import styles from './CheckboxList.module.css';

// Workaround for testing an anonymous function passed to other component
export function onInputChange(callback, param) {
  return () => callback(param);
}

const CheckboxList = ({
  name, value, onChange, checkboxToLeft, fluid, label,
}) => (
  <ListGroupItem
    className={fluid ? `${styles.list} ${styles.fluid}` : styles.list}
  >
    <span>{label}</span>
    <Input
      type="checkbox"
      aria-label={`Checkbox ${name}`}
      className={!checkboxToLeft ? styles.toRight : ''}
      onChange={onInputChange(onChange, { [name]: !value })}
      checked={!!value}
    />
  </ListGroupItem>
);

CheckboxList.defaultProps = {
  value: false,
  fluid: false,
  checkboxToLeft: true,
  label: '',
};

CheckboxList.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  fluid: PropTypes.bool,
  checkboxToLeft: PropTypes.bool,
};

export default CheckboxList;
