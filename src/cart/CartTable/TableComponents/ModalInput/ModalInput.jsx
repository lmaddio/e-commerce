import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import styles from './ModalInput.module.css';

class ModalInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: props[props.property] || '',
    };
    this.toggle = this.toggle.bind(this);
    this.sendValueToStore = this.sendValueToStore.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  toggle() {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  sendValueToStore() {
    const { props, state } = this;
    const {
      id, property, sendValueToStore, product,
    } = this.props;

    const fromPropsValue = props[property];
    let newValue = parseInt(state.value || 0, 10);

    if (product[property] < newValue) {
      newValue = product[property];
    } else if (newValue < 1) {
      newValue = 1;
    }

    if (newValue !== fromPropsValue) {
      sendValueToStore(id, newValue);
    }
    this.setState({ modal: false, value: newValue.toString() });
  }

  render() {
    const { state, props } = this;
    const {
      format, property, type, title,
    } = this.props;
    return (
      <Fragment>
        <span
          onClick={this.toggle}
          className={styles.cell}
        >
          {format ? format(props[property], props) : props[property]}
        </span>

        <Modal isOpen={state.modal} toggle={this.toggle}>

          <ModalHeader toggle={this.toggle}>
            {title}
          </ModalHeader>

          <ModalBody>
            <p className="text-center">Please set the new value</p>
            <Input
              type={type}
              className={styles.input}
              onChange={this.onChange}
              value={state.value}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.sendValueToStore}>Save</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ModalInput.defaultProps = {
  format: null,
  type: 'number',
};

ModalInput.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  property: PropTypes.string.isRequired,
  format: PropTypes.func,
  sendValueToStore: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default ModalInput;
