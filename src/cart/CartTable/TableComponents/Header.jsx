import React from 'react';
import PropTypes from 'prop-types';
import styles from './RowHeader.module.css';

const Header = ({ columns }) => (
  <div className={styles.header}>
    {
      columns.map(({ title, headerClassName = '' }, index) => (
        <div
          key={index.toString()}
          className={`${headerClassName} ${styles.cell}`}
          style={{ order: index }}
        >
          {title && <span className={styles.title}>{title}</span>}
        </div>
      ))
    }
  </div>
);

Header.defaultProps = {
  columns: [],
};

Header.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      headerClassName: PropTypes.string,
    }),
  ),
};

export default Header;
