import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { ThemeContext } from '../../context/ThemeContext';

const ThemedChangeButton = ({ children, ...restProps }) => (
  <ThemeContext.Consumer>
    {
      ({ theme }) => (
        <Button
          color={theme}
          {...restProps}
        >
          {children}
        </Button>
      )
    }
  </ThemeContext.Consumer>
);

ThemedChangeButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemedChangeButton;
