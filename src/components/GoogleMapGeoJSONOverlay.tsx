/// <reference types="googlemaps" />
/// <reference types="geojson" />

import React from 'react';
import { GoogleMapContext } from './GoogleMap';

declare const google: any;

type State = {
  data: google.maps.Data;
}

type OwnProps = {
  geojsons: GeoJSON.Feature[];
  visible: boolean;
}

type Props = OwnProps;

class GoogleMapGeoJSONOverlay extends React.Component<Props, State> {
  static contextType = GoogleMapContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: this.createDataObjectFromProp(props)
		};
  }

  render() {
    this.state.data.setMap(this.props.visible ? this.context : null);
		return (null);
  }

  createDataObjectFromProp(props: Props) {
    const data = new google.maps.Data();
    props.geojsons.forEach(geojson => {
      data.addGeoJson(geojson);
    });

    return data;
  }

  componentWillUnmount() {
    this.state.data.setMap(null);
  }
}

export default GoogleMapGeoJSONOverlay;
