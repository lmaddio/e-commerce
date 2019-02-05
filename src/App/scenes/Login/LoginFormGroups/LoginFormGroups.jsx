import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input, FormFeedback,
} from 'reactstrap';

const LoginFormGroups = ({
  value, type, placeholder, disabled, isValid,
  onChange, name, label, validMessage, message,
}) => (
  <FormGroup disabled={disabled}>
    <Label for={name}>{label}</Label>
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      valid={isValid}
      invalid={isValid === false}
      onChange={onChange}
    />
    { validMessage && (<FormFeedback valid>{validMessage}</FormFeedback>) }
    { message && (<FormFeedback>{message}</FormFeedback>) }
  </FormGroup>
);

LoginFormGroups.defaultProps = {
  isValid: null,
  disabled: false,
  placeholder: '',
  message: '',
  validMessage: '',
  type: 'email',
};

LoginFormGroups.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  validMessage: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default LoginFormGroups;
