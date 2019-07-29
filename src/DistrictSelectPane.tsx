import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DistrictMap, { DistrictMapType } from './DistrictMap';
import DistrictTable from './DistrictTable';

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
          <DistrictMap ref={ this.districtMapRef }/>
        </Tab>
        <Tab tabClassName="thinTab" eventKey="list" title="List">
          <DistrictTable/>
        </Tab>
      </Tabs>
    );
  }
}

export default DistrictSelectPane;
