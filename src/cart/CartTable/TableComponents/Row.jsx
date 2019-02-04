import React from 'react';
import PropTypes from 'prop-types';
import styles from './RowHeader.module.css';

const Row = ({ rows, columns }) => rows.map(
  (row, rowIndex) => (
    <div className={styles.row} key={`row.${row.id}`}>
      {
        columns.map(({ property, format, className = '' }, columnIndex) => (
          <div
            key={`cell.${row.id}.${columnIndex + 0}`}
            className={`${className} ${styles.cell}`}
            style={{
              order: (10 + rowIndex + columnIndex),
            }}
          >
            <span>{format ? format(row[property], row) : row[property]}</span>
          </div>
        ))
      }
    </div>
  ),
);

Row.defaultProps = {
  rows: [],
  columns: [],
};

Row.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      className: PropTypes.string,
      format: PropTypes.func,
    }),
  ),
};

export default Row;
