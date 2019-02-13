import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import CollapsableList from 'App/components/CollapsableList';
import CheckboxList from './Filters/CheckboxList';
import NumberList from './Filters/NumberList';

class FilterList extends PureComponent {
  constructor(props) {
    super(props);
    this.cleanFilters = this.cleanFilters.bind(this);
  }

  cleanFilters() {
    const { cleanFilters, usedFilters } = this.props;
    if (
      Object.values(usedFilters.price).filter(Boolean).length > 0
      || Object.values(usedFilters.quantity).filter(Boolean).length > 0
      || usedFilters.id.filter(Boolean).length > 0
      || usedFilters.available || usedFilters.name || usedFilters.sublevel_id
    ) {
      cleanFilters();
    }
  }

  render() {
    const { usedFilters, setProductsFilter, disableAllFilters } = this.props;
    const { price, quantity, available } = usedFilters;
    return (
      <CollapsableList
        title="Filters"
        closeAction={this.cleanFilters}
        isLoading={disableAllFilters}
      >
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
      </CollapsableList>
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
  disableAllFilters: PropTypes.bool.isRequired,
};

export default FilterList;
