import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { ThemeContext, THEMES } from '../../context/ThemeContext';
import styles from './ThemedInput.module.css';

const ThemedChangeInput = ({ className, ...restProps }) => (
  <ThemeContext.Consumer>
    {
      ({ theme }) => {
        const customClassName = theme === THEMES.GRAY ? styles.inputSecondary : '';
        return (
          <Input
            className={`${customClassName} ${className}`}
            {...restProps}
          />
        );
      }
    }
  </ThemeContext.Consumer>
);

ThemedChangeInput.defaultProps = {
  className: '',
};

ThemedChangeInput.propTypes = {
  className: PropTypes.string,
};

export default ThemedChangeInput;
