/* eslint react/forbid-prop-types: 0 */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Form, Button, Spinner,
} from 'reactstrap';
import LoginFormGroups from '../LoginFormGroups';
import MagicButton from './MagicButton';
import Alert from '../../../components/Alert';

class LoginForm extends Component {
  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      error: props.loginError || '',
    };
  }

  constructor(props) {
    super(props);
    this.clearAlertId = null;
    this.state = Object.values(props.fields).reduce((accumulator, field) => {
      accumulator[field.name] = {
        value: '',
        isValid: null,
      };
      return accumulator;
    }, { error: props.loginError });
    this.getButtonState = this.getButtonState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.generateInputs = this.generateInputs.bind(this);
    this.onDismissAlert = this.onDismissAlert.bind(this);
    this.manageAlert = this.manageAlert.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { error } = this.state;
    if (error !== !prevState.error) {
      this.manageAlert();
    }
  }

  componentWillUnmount() {
    if (this.clearAlertId) {
      clearTimeout(this.clearAlertId);
    }
  }

  onDismissAlert() {
    this.setState({ showAlert: false });
  }

  getButtonState() {
    const { state, props } = this;
    let isButtonDisabled = props.isLoading;
    if (!isButtonDisabled) {
      isButtonDisabled = !Object.values(props.fields).every(({ name }) => state[name].isValid);
    }
    return isButtonDisabled;
  }

  manageAlert() {
    if (this.clearAlertId) {
      clearTimeout(this.clearAlertId);
    }
    this.clearAlertId = setTimeout(this.onDismissAlert, 2000);
  }

  handleChange(event) {
    const { fields } = this.props;
    const { target } = event;
    const { name, value } = target;
    const { validator } = fields[name];
    let isValid = true;
    if (validator && value) {
      isValid = validator(value);
    } else if (!value) {
      isValid = null;
    }
    const newState = {
      [name]: {
        value,
        isValid,
      },
    };
    this.setState(newState);
  }

  submitForm(e) {
    e.preventDefault();
    const { startLogin } = this.props;
    const { email, password } = this.state;
    this.setState({ error: null, showAlert: true }, () => startLogin(email.value, password.value));
  }

  generateInputs(areInputsDisabled) {
    const { state, props } = this;
    return Object.values(props.fields).map(({
      name, type, placeholder, label, validMessage, message,
    }) => (
      <LoginFormGroups
        key={`input.${name}`}
        onChange={this.handleChange}
        disabled={areInputsDisabled}
        value={state[name].value}
        isValid={state[name].isValid}
        label={label}
        type={type}
        name={name}
        placeholder={placeholder}
        validMessage={validMessage}
        message={message}
      />
    ));
  }

  render() {
    const { isLoading } = this.props;
    const { error, showAlert } = this.state;
    const isButtonDisabled = this.getButtonState();
    return (
      <Fragment>
        <h2>Sign In</h2>
        <Form className="form" onSubmit={this.submitForm}>

          {this.generateInputs(isButtonDisabled)}

          <FormGroup>
            <Button
              disabled={isButtonDisabled}
              color="primary"
            >
              Submit
              {' '}
              {
                isLoading
                  ? <Spinner size="sm" color="secondary" />
                  : null
              }
            </Button>
            <MagicButton />
          </FormGroup>
          {
            error && (
              <Alert
                showAlert={showAlert}
                toggle={this.onDismissAlert}
                message={error}
              />
            )
          }
        </Form>
      </Fragment>
    );
  }
}

LoginForm.defaultProps = {
  isLoading: false,
  loginError: '',
};

LoginForm.propTypes = {
  startLogin: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  isLoading: PropTypes.bool,
  fields: PropTypes.object.isRequired,
};

export default LoginForm;
