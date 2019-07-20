import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Menu from './Menu';

import DistrictSelectPane from './DistrictSelectPane';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Menu/>
      <Container fluid={true} >
        <Row>
          <Col className="thinCol">
            <DistrictSelectPane/>
          </Col>
          <Col className="thinCol" md="3">
            <Card>
              <Card.Header>Card Title</Card.Header>
              <Card.Body>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="thinCol">
            <Card>
              <Card.Header>Card Title</Card.Header>
              <Card.Body>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
