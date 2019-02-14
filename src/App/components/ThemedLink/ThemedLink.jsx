import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import { ThemeContext, THEMES } from '../../context/ThemeContext';

const ThemedLink = ({
  to, title, onClick, navLinkProps,
}) => (
  <ThemeContext.Consumer>
    {({ theme }) => (
      <NavItem {...navLinkProps}>
        <Link
          to={to}
          onClick={onClick}
          className={`nav-link ${theme === THEMES.GRAY ? '' : 'text-white'}`}
        >
          {title}
        </Link>
      </NavItem>
    )}
  </ThemeContext.Consumer>
);

ThemedLink.defaultProps = {
  to: '#',
  onClick: null,
  navLinkProps: {},
};

ThemedLink.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  navLinkProps: PropTypes.shape({
    className: PropTypes.string,
  }),
};

export default ThemedLink;
