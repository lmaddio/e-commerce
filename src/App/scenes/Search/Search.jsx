import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import SortList from 'products/SortList';
import FilterList from 'products/FilterList';
import ProductList from 'products/ProductList';
import InputSearch from 'products/InputSearch';
import CategoriesMenu from 'categories/Menu';
import NavBar from '../../components/NavBar';

class Search extends Component {
  componentDidMount() {
    const { getMinimalData } = this.props;
    getMinimalData();
  }

  render() {
    return (
      <Fragment>
        <NavBar>
          <CategoriesMenu InputComponent={InputSearch} />
        </NavBar>
        <Container fluid>
          <Row>
            <Col xs="12" sm="6" md="4" style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <SortList />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <FilterList />
              </div>
            </Col>
            <Col xs="12" sm="6" md="8">
              <ProductList />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Search.propTypes = {
  getMinimalData: PropTypes.func.isRequired,
};

export default Search;
