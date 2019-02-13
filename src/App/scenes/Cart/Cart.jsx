import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Nav, Container,
} from 'reactstrap';
import CartTable from 'cart/CartTable';
import NavBar from '../../components/NavBar';
import ThemedLink from '../../components/ThemedLink';
import FullLoader from '../../components/FullLoader';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.hasItems,
    };
  }

  componentDidMount() {
    const { getProductsData } = this.props;
    getProductsData();
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (!isLoading && prevProps.isLoading) {
      this.toggleLoadingState();
    }
  }

  toggleLoadingState() {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <Fragment>
        <NavBar>
          <Nav navbar>
            <ThemedLink
              to="/"
              title="Market"
            />
          </Nav>
        </NavBar>
        <Container>
          {
            isLoading
              ? (<FullLoader />)
              : (
                <Row>
                  <Col xs="12" lg={{ size: 8, offset: 2 }}>
                    <CartTable />
                  </Col>
                </Row>
              )
          }
        </Container>
      </Fragment>
    );
  }
}

Cart.propTypes = {
  getProductsData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasItems: PropTypes.bool.isRequired,
};

export default Cart;
