import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import TitleWithCloseButton from 'App/components/common/TitleWithCloseButton';
import SortItem from './SortItem';
import styles from './SortList.module.css';

class SortList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displaySort: false,
    };
    this.cleanSort = this.cleanSort.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.toggleDisplaySort = this.toggleDisplaySort.bind(this);
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

  toggleDisplaySort() {
    const { displaySort } = this.state;
    this.setState({ displaySort: !displaySort });
  }

  render() {
    const { sortTypes, sort, isLoading } = this.props;
    const { displaySort } = this.state;
    const disableEvents = isLoading ? { pointerEvents: 'none' } : {};
    return (
      <section style={disableEvents}>
        <ListGroup>
          <ListGroupItem color="secondary">
            <TitleWithCloseButton
              title="Sort"
              onClickTitle={this.toggleDisplaySort}
              onClickClean={this.cleanSort}
            />
          </ListGroupItem>
          <Collapse isOpen={displaySort}>
            <ListGroupItem className={styles.sortTitleContainer}>
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
            </ListGroupItem>
          </Collapse>
        </ListGroup>
      </section>
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
      fields: PropTypes.object,
      order: PropTypes.object,
    }),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SortList;
