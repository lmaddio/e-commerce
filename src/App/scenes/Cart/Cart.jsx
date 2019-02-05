import React, { Fragment } from 'react';
import {
  Row, Col, Nav, Container,
} from 'reactstrap';
import CartTable from 'cart/CartTable';
import NavBar from '../../components/NavBar';
import NavLink from '../../components/NavLink';

const Cart = () => (
  <Fragment>
    <NavBar>
      <Nav navbar>
        <NavLink
          to="/"
          title="Market"
        />
      </Nav>
    </NavBar>
    <Container>
      <Row>
        <Col xs="12" lg={{ size: 8, offset: 2 }}>
          <CartTable />
        </Col>
      </Row>
    </Container>
  </Fragment>
);

export default Cart;
