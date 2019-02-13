import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Nav,
} from 'reactstrap';
import ThemedLink from '../ThemedLink';
import Navbar from './ThemedNavbar';
import styles from './NavBar.module.css';

class AppNavBar extends React.PureComponent {
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
        <Navbar className={!isOpen ? styles.NavBar : ''}>
          {children}
          <NavbarBrand tag="span">
            <Link to="/" className={styles.navBrand}>
              El Baraton
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar className={styles.navBarCollapse}>
            <Nav navbar>
              <ThemedLink
                to="/cart"
                title="Cart"
              />
              <ThemedLink
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
