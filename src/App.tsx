import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import { districtOverlays, districtInfos } from './data/Data';
import DistrictSelectPane from './DistrictSelectPane';
import DCCAPanel from './DCCAPanel';
import Menu from './Menu';
import { ReduxState } from './Types';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

type OwnProps = {
}

type StateProps = {
  page: string;
}

type DispatchProps = {
}

type Props = StateProps & OwnProps & DispatchProps;

const App: React.FunctionComponent<Props> = (props) => {
  const districtOverlay = props.page === '' ? {} : districtOverlays[props.page]

  return (
    <div className="App">
      <Menu/>
      <Container fluid={true} >
        <Row>
          <Col className="thinCol">
            <DistrictSelectPane districtOverlay={ districtOverlay } districtInfo={ districtInfos[props.page] }/>
          </Col>
          <Col className="thinCol" md="3">
            <DCCAPanel districtInfo={ districtInfos[props.page] }/>
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

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    page: state.page,
  };
};

const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
