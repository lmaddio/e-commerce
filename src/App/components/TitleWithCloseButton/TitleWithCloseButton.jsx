import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import styles from './TitleWithCloseButton.module.css';

const TitleWithCloseButton = ({ title, onClickTitle, onClickClean }) => (
  <div className={styles.titleSeparator}>
    <Button
      type="button"
      block
      color="transparent"
      className={styles.buttonLeftPadding}
      onClick={onClickTitle}
    >
      <span className="dropdown-toggle">{title}</span>
    </Button>
    <Button close onClick={onClickClean} id={title} />
    <UncontrolledTooltip placement="left" target={title} innerClassName={styles.tooltip}>
      Click here to clear the
      {' '}
      {title}
    </UncontrolledTooltip>
  </div>
);

TitleWithCloseButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClickTitle: PropTypes.func.isRequired,
  onClickClean: PropTypes.func.isRequired,
};

export default TitleWithCloseButton;
