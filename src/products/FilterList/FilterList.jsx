import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import TitleWithCloseButton from 'App/components/common/TitleWithCloseButton';
import CheckboxList from './Filters/CheckboxList';
import NumberList from './Filters/NumberList';
import styles from './FilterList.module.css';

class FilterList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayFilter: false,
    };
    this.cleanFilters = this.cleanFilters.bind(this);
    this.toggleDisplayFilter = this.toggleDisplayFilter.bind(this);
  }

  cleanFilters() {
    const { cleanFilters, usedFilters } = this.props;
    if (
      Object.values(usedFilters.price).filter(Boolean).length > 0
      || Object.values(usedFilters.quantity).filter(Boolean).length > 0
      || usedFilters.available
    ) {
      cleanFilters();
    }
  }

  toggleDisplayFilter() {
    const { displayFilter } = this.state;
    this.setState({ displayFilter: !displayFilter });
  }

  render() {
    const { usedFilters, setProductsFilter } = this.props;
    const { price, quantity, available } = usedFilters;
    const { displayFilter } = this.state;
    return (
      <ListGroup>
        <ListGroupItem
          className={styles.filterTitle}
          color="secondary"
        >
          <TitleWithCloseButton
            title="Filters"
            onClickTitle={this.toggleDisplayFilter}
            onClickClean={this.cleanFilters}
          />
        </ListGroupItem>
        <Collapse isOpen={displayFilter}>
          <ListGroupItem className={styles.setContainerPadding}>
            <ListGroup flush>
              <CheckboxList
                fluid
                checkboxToLeft={false}
                name="available"
                label="Available"
                value={available}
                onChange={setProductsFilter}
              />

              <NumberList
                fluid
                name="quantity"
                label="Quantity"
                minValue={quantity.min}
                maxValue={quantity.max}
                setValues={setProductsFilter}
              />

              <NumberList
                fluid
                name="price"
                label="Price"
                minValue={price.min}
                maxValue={price.max}
                setValues={setProductsFilter}
              />
            </ListGroup>
          </ListGroupItem>
        </Collapse>
      </ListGroup>
    );
  }
}

FilterList.propTypes = {
  setProductsFilter: PropTypes.func.isRequired,
  cleanFilters: PropTypes.func.isRequired,
  usedFilters: PropTypes.shape({
    price: PropTypes.shape({
      min: PropTypes.string,
      max: PropTypes.string,
    }),
    quantity: PropTypes.shape({
      min: PropTypes.string,
      max: PropTypes.string,
    }),
    available: PropTypes.bool,
  }).isRequired,
};

export default FilterList;
