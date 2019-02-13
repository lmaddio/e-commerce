import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import TitleWithCloseButton from '../TitleWithCloseButton';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './CollapsableList.module.css';

class CollapsableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displaySort: window.innerWidth > 575,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay() {
    const { displaySort } = this.state;
    this.setState({ displaySort: !displaySort });
  }

  render() {
    const {
      children, isLoading, closeAction, title,
    } = this.props;
    const { displaySort } = this.state;
    const disableEvents = isLoading ? { pointerEvents: 'none' } : {};
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <section style={disableEvents}>
            <ListGroup>
              <ListGroupItem color={theme}>
                <TitleWithCloseButton
                  title={title}
                  onClickTitle={this.toggleDisplay}
                  onClickClean={closeAction}
                />
              </ListGroupItem>
              <Collapse isOpen={displaySort}>
                <ListGroupItem className={styles.setContainerPadding}>
                  {children}
                </ListGroupItem>
              </Collapse>
            </ListGroup>
          </section>
        )}
      </ThemeContext.Consumer>
    );
  }
}

CollapsableList.propTypes = {
  closeAction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CollapsableList;
