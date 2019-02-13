import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const THEMES = {
  GRAY: 'secondary',
  BLUE: 'primary',
};

export const ThemeContext = React.createContext(THEMES.GRAY);

class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: THEMES.GRAY,
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    let { theme } = this.state;
    theme = theme === THEMES.GRAY ? THEMES.BLUE : THEMES.GRAY;
    this.setState({ theme });
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
