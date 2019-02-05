import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import NavLink from '../NavLink';
import styles from './NavBar.module.css';

class AppNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { children, logout } = this.props;
    return (
      <div className={styles.NavBarReplace}>
        <Navbar
          color="light"
          light
          fixed="top"
          expand="md"
          className={!isOpen ? styles.NavBar : ''}
        >
          {children}
          <Link to="/" className="nav-link">
            El Baraton
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar className={styles.navBarCollapse}>
            <Nav navbar>
              <NavLink
                to="/cart"
                title="Cart"
              />
              <NavLink
                onClick={logout}
                title="Log out"
              />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

AppNavBar.defaultProps = {
  children: null,
};

AppNavBar.propTypes = {
  children: PropTypes.node,
  logout: PropTypes.func.isRequired,
};

export default AppNavBar;
