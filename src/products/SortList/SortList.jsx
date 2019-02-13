import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CollapsableList from 'App/components/CollapsableList';
import SortItem from './SortItem';

class SortList extends PureComponent {
  constructor(props) {
    super(props);
    this.cleanSort = this.cleanSort.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
  }

  onChangeSort(newSort) {
    const { setProductsSort, sort } = this.props;
    if (sort.field !== newSort.field
      || sort.order !== newSort.order) {
      setProductsSort(newSort);
    }
  }

  cleanSort() {
    const { cleanProductsSort, sortTypes, sort } = this.props;

    if (sort.field !== sortTypes.default.field
      || sort.order !== sortTypes.default.order) {
      cleanProductsSort();
    }
  }

  render() {
    const { sortTypes, sort, isLoading } = this.props;
    return (
      <CollapsableList
        title="Sort"
        closeAction={this.cleanSort}
        isLoading={isLoading}
      >
        {
          Object.values(sortTypes.fields).map(({ label, name }) => (
            <SortItem
              key={`sortList.${name}`}
              name={name}
              label={label}
              currentOrder={sort.order}
              selected={sort.field === name}
              onChangeSort={this.onChangeSort}
            />
          ))
        }
      </CollapsableList>
    );
  }
}

SortList.propTypes = {
  setProductsSort: PropTypes.func.isRequired,
  cleanProductsSort: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  sortTypes: PropTypes.shape({
    fields: PropTypes.object,
    order: PropTypes.object,
    default: PropTypes.shape({
      fields: PropTypes.string,
      order: PropTypes.string,
    }),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SortList;
