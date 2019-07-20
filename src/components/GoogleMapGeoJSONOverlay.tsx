/// <reference types="googlemaps" />
/// <reference types="geojson" />

import React from 'react';
import { GoogleMapContext } from './GoogleMap';

declare const google: any;

const tinycolor = require('tinycolor2');

type State = {
  data: google.maps.Data;
}

type OwnProps = {
  geojsons: GeoJSON.Feature[];
  visible: boolean;
  color?: string;
  highlightOnMouseOver?: boolean;
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
    const data: google.maps.Data = new google.maps.Data();
    props.geojsons.forEach(geojson => {
      data.addGeoJson(geojson);
    });
    if (this.props.highlightOnMouseOver) {
      data.addListener('mouseover', this.onMouseOver.bind(this));
      data.addListener('mouseout', this.onMouseOut.bind(this));
    }

    return data;
  }

  componentWillUnmount() {
    this.state.data.setMap(null);
    this.state.data.unbindAll();
  }

  onMouseOver(event: google.maps.Data.MouseEvent) {
    const data = this.state.data;
    const orgFillColor = (data.getStyle() as google.maps.Data.StyleOptions).fillColor;
    const fillColor = tinycolor(orgFillColor).brighten(20);
		data.overrideStyle(event.feature, { fillColor });
  }

  onMouseOut(event: google.maps.Data.MouseEvent) {
    this.state.data.revertStyle(event.feature);
  }
}

export default GoogleMapGeoJSONOverlay;
