import React from 'react';
import { Button } from 'reactstrap';
import { ThemeContext, THEMES } from '../../context/ThemeContext';

const ThemedChangeButton = () => (
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
);

export default ThemedChangeButton;
