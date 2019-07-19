import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import { connect } from 'react-redux';
import { feature } from "topojson";
import GoogleMap from './components/GoogleMap';
import GoogleMapOverlay from './components/GoogleMapOverlay';
import Menu from './Menu';
import { ReduxState } from './Types';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const dcca_2019_topojson: any = require('./data/dcca_2019-topo.json');
const dcca_2019_features = dcca_2019_topojson.objects.dcca_2019.geometries.map((geo: any) => feature(dcca_2019_topojson, geo));

type StateProps = {
  districtFilter: string
}

type Props = StateProps;

const App: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="App">
      <Menu/>
      <Container fluid={true} >
        <Row>
          <Col className="thinCol">
            <Tabs defaultActiveKey="map" id="selectDistrictPane">
              <Tab tabClassName="thinTab" eventKey="map" title="Map">
                <div style={{height: "60vh"}}>
                  <GoogleMap>
                    {
                      dcca_2019_features
                        .map((f: any) =>
                          <GoogleMapOverlay
                            key={f.properties["CACODE"]}
                            geojson={f}
                            visible={f.properties["CACODE"].startsWith(props.districtFilter)}/>
                        )
                      }
                  </GoogleMap>
                </div>
              </Tab>
              <Tab tabClassName="thinTab" eventKey="list" title="List">
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

const mapStateToProps = (state: ReduxState): Props => {
  return { districtFilter: state.districtFilter };
};

const ConnectedDistrictFilter = connect(mapStateToProps)(App);
export default ConnectedDistrictFilter;
