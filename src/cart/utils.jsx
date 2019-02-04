import React from 'react';

const passPropsToComponent = (Components, props = {}) => (<Components {...props} />);

export default passPropsToComponent;
