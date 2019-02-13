import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { ThemeContext, THEMES } from '../../context/ThemeContext';

const ThemedChangeButton = ({ children }) => (
  <Fragment>
    {
      children
        ? (
          <ThemeContext.Consumer>
            {
              ({ theme, toggleTheme }) => (
                <Button
                  color={theme === THEMES.GRAY ? THEMES.BLUE : THEMES.GRAY}
                  style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '20px',
                    zIndex: '999',
                  }}
                  onClick={toggleTheme}
                >
                  Change theme!
                </Button>
              )
            }
          </ThemeContext.Consumer>
        )
        : null
    }
    {children}
  </Fragment>
);

ThemedChangeButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemedChangeButton;
