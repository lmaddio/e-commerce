import React from 'react';
import PropTypes from 'prop-types';
import CollapsibleMenu from '../CollapsibleMenu';

const SetMenuComponent = ({ categories, depth, children }) => categories.map(
  ({ name, sublevels, id }, index) => {
    let collapseMenuChildren = React.Children.map(
      children, child => React.cloneElement(
        child, { id },
      ),
    );

    if (sublevels && sublevels.length > 0) {
      collapseMenuChildren = (
        <SetMenuComponent categories={sublevels} depth={depth + 1}>
          {children}
        </SetMenuComponent>
      );
    }

    return (
      <CollapsibleMenu
        key={`collapseMenu.${id}`}
        name={name}
        depth={depth}
        id={id}
        isLastChild={depth === 1 && (index === (categories.length - 1))}
        isLastSublevel={!sublevels || sublevels.length === 0}
      >
        {collapseMenuChildren}
      </CollapsibleMenu>
    );
  },
);


SetMenuComponent.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      sublevels: PropTypes.arrayOf(
        PropTypes.object,
      ),
    }),
  ).isRequired,
  depth: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default SetMenuComponent;
