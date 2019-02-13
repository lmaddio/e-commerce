import React from 'react';
import { Spinner } from 'reactstrap';

const styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
};

const FullLoader = () => (
  <div style={styles}>
    <Spinner />
  </div>
);

export default FullLoader;
