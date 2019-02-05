
import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const FunnyMessage = () => (
  <Jumbotron>
    <h1 className="display-3">Oh Sorry!</h1>
    <p className="lead">Seems we have a small issue.</p>
    <hr className="my-2" />
    <p>Please try reloading the page, if problems keeps please contact me :D</p>
    <p className="lead">
      <Button color="primary" onClick={() => window.location.reload()}>Reload</Button>
    </p>
  </Jumbotron>
);

export default FunnyMessage;
