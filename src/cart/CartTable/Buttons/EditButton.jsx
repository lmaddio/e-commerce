import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
// import Button from 'App/components/ThemedButton';
import styles from './EditButton.module.css';

const EditButton = (text, icon) => (
  <Fragment>
    <span key="EditButton-text">{text}</span>
    <Button key="EditButton-icon" color="transparent" className={styles.button}>{icon}</Button>
  </Fragment>
);

export default EditButton;
