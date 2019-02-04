import React from 'react';
import PropTypes from 'prop-types';
import styles from './RowHeader.module.css';

const Header = ({ columns }) => columns.map(({ title, className = '' }, index) => (
  <div
    key={index.toString()}
    className={`${className} ${styles.cell}`}
    style={{ order: index }}
  >
    {title && <span className={styles.title}>{title}</span>}
  </div>
));

Header.defaultProps = {
  columns: [],
};

Header.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      className: PropTypes.string,
    }),
  ),
};

export default Header;
