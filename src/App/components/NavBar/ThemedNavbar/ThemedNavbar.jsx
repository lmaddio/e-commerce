import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'reactstrap';
import { ThemeContext, THEMES } from '../../../context/ThemeContext';

const ThemedNavbar = ({ children, ...restProps }) => (
  <ThemeContext.Consumer>
    {
      ({ theme }) => (
        <Navbar
          color={theme === THEMES.GRAY ? 'light' : 'primary'}
          light={theme === THEMES.GRAY}
          dark={theme !== THEMES.GRAY}
          fixed="top"
          expand="md"
          {...restProps}
        >
          {children}
        </Navbar>
      )
    }
  </ThemeContext.Consumer>
);

ThemedNavbar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemedNavbar;
