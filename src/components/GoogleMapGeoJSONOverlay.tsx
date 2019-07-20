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
  color?: string;
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
    const style: google.maps.Data.StyleOptions = {
      strokeWeight: 1.25,
      fillOpacity: 0.3,
    }

    if (this.props.color) {
      style.fillColor = this.props.color;
    }

    this.state.data.setStyle(style);
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
