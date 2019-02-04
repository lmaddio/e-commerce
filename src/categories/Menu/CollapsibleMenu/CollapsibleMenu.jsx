import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
} from 'reactstrap';
import arrowUp from 'images/up-arrow.svg';
import arrowDown from 'images/down-arrow.svg';
import styles from './CollapsibleMenu.module.css';

class CollapsibleMenu extends Component {
  static isDescendant({ parent, child }) {
    let node = child.parentNode;
    while (node !== null) {
      if (node.isSameNode(parent)) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.containerTrigger = React.createRef();
    this.buttonTrigger = React.createRef();
    this.onToggle = this.onToggle.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onToggle(event) {
    const { dropdownOpen } = this.state;
    const { target } = event;
    const parentNode = this.containerTrigger.current;
    const buttonNode = this.buttonTrigger.current;
    if (parentNode.isSameNode(target)
      || parentNode.isSameNode(target.parentNode)
      || buttonNode.isSameNode(target.parentNode)
      || CollapsibleMenu.isDescendant({ parent: target, child: parentNode })
    ) {
      this.setState({ dropdownOpen: !dropdownOpen });
    }
  }

  onBlur(event) {
    const { relatedTarget } = event;
    const node = this.containerTrigger.current;
    if (
      relatedTarget
      && !node.isSameNode(relatedTarget)
      && !CollapsibleMenu.isDescendant({ parent: node, child: relatedTarget })
    ) {
      this.setState({ dropdownOpen: false });
    }
  }

  render() {
    const {
      name, id, children, depth, isLastChild, isLastSublevel,
    } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <li
        key={`li.${id}`}
        className={styles.itemTitle}
        ref={this.containerTrigger}
        onBlur={this.onBlur}
      >
        <Button
          outline
          block
          type="button"
          onClick={this.onToggle}
          style={{
            border: 'none', height: '36px', position: 'relative',
          }}
          className={(isLastSublevel && dropdownOpen) ? styles.selected : ''}
          innerRef={this.buttonTrigger}
        >
          <span
            style={{
              position: 'relative',
              left: `${depth * 10}px`,
              float: 'left',
            }}
          >
            {`- ${name}`}
          </span>
          <img src={dropdownOpen ? arrowUp : arrowDown} alt="caret" className={styles.arrow} />
        </Button>
        { (isLastChild && !dropdownOpen) ? null : (<div className={styles.divider} />) }
        <ul className={styles.itemContent}>
          <Collapse isOpen={dropdownOpen}>
            {children}
          </Collapse>
        </ul>
      </li>
    );
  }
}

CollapsibleMenu.defaultProps = {
  depth: 1,
  isLastSublevel: false,
};

CollapsibleMenu.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  depth: PropTypes.number,
  children: PropTypes.node.isRequired,
  isLastChild: PropTypes.bool.isRequired,
  isLastSublevel: PropTypes.bool,
};

export default CollapsibleMenu;
