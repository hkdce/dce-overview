import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectYear } from './Actions';
import DistrictFilter from './DistrictFilter';
import { ReduxState } from './Types';

type StateProps = {
  year: string;
}

type DispatchProps = {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps;

const Menu: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="#home">區議會情報</Navbar.Brand>
      <Nav onSelect={(eventKey: string) => props.dispatch(selectYear(eventKey))}>
      {
        ['2019', '2015'].map(y => <Nav.Link key={y} eventKey={y} active={ props.year === y}>{y}</Nav.Link>)
      }
      </Nav>
      <DistrictFilter className="mr-auto"/>
    </Navbar>
  );
  /*
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  </Navbar.Collapse>
  <Form inline>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    <Button variant="outline-success">Search</Button>
  </Form>
  */
}

const mapStateToProps = (state: ReduxState) => {
  return { year: state.year };
};

const ConnectedMenu = connect(mapStateToProps)(Menu);

export default ConnectedMenu;
