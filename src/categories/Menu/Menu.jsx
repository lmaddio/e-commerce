import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { ThemeContext } from 'App/context/ThemeContext';
import SubMenu from './SubMenu';
import styles from './Menu.module.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.showDropdown = this.showDropdown.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  showDropdown(show) {
    return () => this.setState({
      dropdownOpen: show,
    });
  }

  toggle(evt) {
    evt.preventDefault();
    const { dropdownOpen } = this.state;
    this.setState({ dropdownOpen: !dropdownOpen });
  }

  render() {
    const { categories, InputComponent } = this.props;
    const { dropdownOpen } = this.state;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <DropdownToggle caret color={theme}>
              <span>Categories</span>
            </DropdownToggle>
          )}
        </ThemeContext.Consumer>
        <DropdownMenu className={styles.menu}>
          <SubMenu categories={categories} depth={1}>
            <InputComponent />
          </SubMenu>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

Menu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      sublevels: PropTypes.arrayOf(
        PropTypes.object,
      ),
    }),
  ).isRequired,
  InputComponent: PropTypes.func.isRequired,
};

export default Menu;
