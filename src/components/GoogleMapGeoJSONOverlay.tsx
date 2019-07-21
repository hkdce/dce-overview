/// <reference types="googlemaps" />
/// <reference types="geojson" />

import React from 'react';
import { GoogleMapContext } from './GoogleMap';

declare const google: any;

const tinycolor = require('tinycolor2');

type State = {
  data: google.maps.Data | null;
}

type OwnProps = {
  geojsons: GeoJSON.Feature[]; // Does not support mutating after initialization.
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
      data: null
    };
  }

  componentDidMount() {
    if (!this.state.data) {
      const data = this.createDataObjectFromProp(this.props);
      this.setState({ data });
    }
  }

  componentWillUnmount() {
    if (!this.state.data) return;

    this.state.data.setMap(null);
    this.state.data.unbindAll();
    this.setState({ data: null });
  }

  render() {
    const data = this.state.data;
    if (data) {
      const nextMap: google.maps.Map = this.props.visible ? this.context : null;
      if (data.getMap() !== nextMap) {
        data.setMap(nextMap);
      }
      const currentStyle: google.maps.Data.StyleOptions = data.getStyle() as google.maps.Data.StyleOptions;
      if (currentStyle.fillColor !== this.props.color) {
        currentStyle.fillColor = this.props.color;
        data.setStyle(currentStyle);
      }
    }

    return null;
  }

  createDataObjectFromProp(props: Props) {
    const data: google.maps.Data = new google.maps.Data();
    props.geojsons.forEach(geojson => {
      data.addGeoJson(geojson);
    });

    const style: google.maps.Data.StyleOptions = {
      strokeWeight: 1.25,
      fillOpacity: 0.3,
    }
    data.setStyle(style);

    data.addListener('mouseover', this.onMouseOver.bind(this));
    data.addListener('mouseout', this.onMouseOut.bind(this));

    return data;
  }

  onMouseOver(event: google.maps.Data.MouseEvent) {
    const data = this.state.data;
    if (!data) return;

    if (this.props.highlightOnMouseOver) {
      const orgFillColor = (data.getStyle() as google.maps.Data.StyleOptions).fillColor;
      const fillColor = tinycolor(orgFillColor).brighten(20);
      data.overrideStyle(event.feature, { fillColor });
    }
  }

  onMouseOut(event: google.maps.Data.MouseEvent) {
    const data = this.state.data;
    if (!data) return;

    if (this.props.highlightOnMouseOver) {
      data.revertStyle(event.feature);
    }
  }
}

export default GoogleMapGeoJSONOverlay;
