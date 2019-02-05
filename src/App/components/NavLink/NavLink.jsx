import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavItem } from 'reactstrap';

const NavLink = ({ to, title, onClick }) => (
  <NavItem>
    <Link
      to={to}
      onClick={onClick}
      className="nav-link"
    >
      {title}
    </Link>
  </NavItem>
);

NavLink.defaultProps = {
  to: '#',
  onClick: null,
};

NavLink.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavLink;
