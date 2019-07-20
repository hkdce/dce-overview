import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import DistrictMap, { DistrictMapType } from './DistrictMap';

class DistrictSelectPane extends React.Component {
  private districtMapRef: React.RefObject<DistrictMapType> = React.createRef();

  onTabUpdate() {
    if (this.districtMapRef.current) {
      this.districtMapRef.current.forceUpdate();
    }
  }

  render() {
    return (
      <Tabs defaultActiveKey="map" id="selectDistrictPane" onSelect={ () => this.onTabUpdate() }>
        <Tab style={{ height: "60vh" }} tabClassName="thinTab" eventKey="map" title="Map">
          <DistrictMap ref={this.districtMapRef}/>
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
    );
  }
}

export default DistrictSelectPane;
