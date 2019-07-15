import _ from 'underscore';

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import { DistrictFilter, reducers as districtFilterReducers } from './DistrictFilter';
import { configureStore, createReducer } from 'redux-starter-kit'
import { combineReducers } from 'redux'

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { DistricNames } from './Types';

interface Prop {

}

interface AppState {
  districtFilter: string;
}

const districtNames: DistricNames = require('./data/districts_name.json');
const districtFilterItems: DistricNames = _.mapObject(districtNames, (v, k) => k + " - " + v);
districtFilterItems[""] = "全香港";
const districtFilterOrder = Object.keys(districtFilterItems);
districtFilterOrder.sort();

class App extends React.Component<Prop, AppState> {
  static reducers = districtFilterReducers;

  render = () => {
    return (
      <div className="App">
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="#home">區議會情報</Navbar.Brand>
          <Nav>
            <Nav.Link href="#2019">2019</Nav.Link>
            <Nav.Link href="#2015">2015</Nav.Link>
          </Nav>
          <DistrictFilter className="mr-auto" items={districtFilterItems} itemOrder={districtFilterOrder}></DistrictFilter>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar>
        <Container fluid={true} >
          <Row>
            <Col>
              <Tabs defaultActiveKey="map" id="uncontrolled-tab-example">
                <Tab eventKey="map" title="Map">
                  <div>DIU YOU</div>
                </Tab>
                <Tab eventKey="list" title="List">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </Col>
            <Col md="3">
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
            <Col>
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
}

export default App;
