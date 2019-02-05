import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from './Form';
import fields from './fields';

const Login = () => (
  <Container style={{ marginTop: '2rem' }}>
    <Row>
      <Col xs="12" sm={{ size: '10', offset: 1 }} lg={{ size: '6', offset: 3 }}>
        <LoginForm fields={fields} />
      </Col>
    </Row>
  </Container>
);

export default Login;
