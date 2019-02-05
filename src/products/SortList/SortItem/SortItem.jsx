import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import arrowUp from 'images/up-arrow.svg';
import arrowDown from 'images/down-arrow.svg';
import { SORT_TYPES } from '../../products.constants';
import styles from './SortItem.module.css';

export function changeSort(callback, args) {
  return () => callback(args);
}

const SortItem = ({
  currentOrder, label, name, onChangeSort, selected,
}) => (
  <ListGroup flush key={`sort.${name}`}>
    <ListGroupItem className={styles.titleSeparator}>
      <span className={selected ? styles.selected : ''}>{label}</span>
      <div className="SortImages">
        <Button
          type="button"
          disabled={selected && (currentOrder === SORT_TYPES.order.ASC)}
          outline
          size="sm"
          onClick={changeSort(onChangeSort, { field: name, order: SORT_TYPES.order.ASC })}
        >
          <img
            className={styles.arrow}
            src={arrowDown}
            alt="sort_down"
          />
        </Button>
        {' '}
        <Button
          type="button"
          disabled={selected && (currentOrder === SORT_TYPES.order.DESC)}
          outline
          size="sm"
          onClick={changeSort(onChangeSort, { field: name, order: SORT_TYPES.order.DESC })}
        >
          <img
            className={styles.arrow}
            src={arrowUp}
            alt="sort_up"
          />
        </Button>
      </div>
    </ListGroupItem>
  </ListGroup>
);

SortItem.propTypes = {
  currentOrder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onChangeSort: PropTypes.func.isRequired,
};

export default SortItem;
