import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

class InputSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.timerId = null;
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onDelayChange = this.onDelayChange.bind(this);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value }, () => {
      if (this.timerId) {
        clearTimeout(this.onDelayChange);
      }
      this.timerId = setTimeout(this.onDelayChange, 250);
    });
  }

  onDelayChange() {
    const { id, onDelayChange } = this.props;
    const { value } = this.state;
    onDelayChange(id, value);
  }

  render() {
    const { value } = this.state;
    return (
      <Input
        type="text"
        placeholder="Search product by name"
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

InputSearch.propTypes = {
  id: PropTypes.number.isRequired,
  onDelayChange: PropTypes.func.isRequired,
};

export default InputSearch;
