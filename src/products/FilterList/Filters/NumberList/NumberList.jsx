import React from 'react';
import PropTypes from 'prop-types';
import {
  ListGroupItem,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import rightArrow from 'images/right-arrow.svg';
import styles from './NumberList.module.css';

class NumberList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      minValue: props.minValue || '',
      maxValue: props.maxValue || '',
    };
    this.onChange = this.onChange.bind(this);
    this.setValues = this.setValues.bind(this);
    this.isButtonEnable = this.isButtonEnable.bind(this);
  }

  onChange(event) {
    const { value, name } = event.target;
    this.setState({
      [`${name}Value`]: value,
    });
  }

  setValues() {
    const { setValues, name } = this.props;
    const { minValue, maxValue } = this.state;
    setValues({
      [name]: {
        min: minValue === '' ? null : minValue,
        max: maxValue === '' ? null : maxValue,
      },
    });
  }

  isButtonEnable() {
    const { minValue, maxValue } = this.props;
    const { minValue: minStateValue, maxValue: maxStateValue } = this.state;

    return (minValue !== minStateValue) || (maxValue !== maxStateValue);
  }

  render() {
    const { label, fluid } = this.props;
    const { minValue, maxValue } = this.state;
    const isButtonDisabled = !this.isButtonEnable();
    return (
      <ListGroupItem
        className={fluid ? styles.fluid : ''}
      >
        <span className={styles.title}>{label}</span>
        <InputGroup size="sm">
          <Input
            type="number"
            placeholder="min"
            name="min"
            onChange={this.onChange}
            value={minValue}
          />
          <Input
            type="number"
            placeholder="max"
            name="max"
            onChange={this.onChange}
            value={maxValue}
          />
          <InputGroupAddon addonType="append">
            <Button
              outline
              color="secondary"
              disabled={isButtonDisabled}
              onClick={this.setValues}
            >
              <img
                src={rightArrow}
                alt="search"
                className={styles.arrow}
              />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </ListGroupItem>
    );
  }
}

NumberList.defaultProps = {
  fluid: false,
  minValue: '',
  maxValue: '',
};

NumberList.propTypes = {
  setValues: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
  fluid: PropTypes.bool,
};

export default NumberList;
