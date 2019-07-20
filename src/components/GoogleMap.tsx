/// <reference types="googlemaps" />

import React from 'react';
import { BBox } from 'geojson';

declare const google: any;
const LatLngBounds = google.maps.LatLngBounds;

type State = {
  map: google.maps.Map | null;
}

type OwnProps = {
  panTo?: BBox;
}

type Props = OwnProps;

export const GoogleMapContext = React.createContext<google.maps.Map | null>(null);

class GoogleMap extends React.Component<Props, State> {
  private map: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      map: null,
		};
  }

  componentDidMount() {
		if (this.state.map == null) {
			var mapOptions = {
				center: { lat: 22.3300, lng: 114.1880},
				zoom: 11,
      };
      const map = new google.maps.Map(this.refs.mapCanvas as Element, mapOptions);
      this.setState({map});
		}
  }

  render() {
		return (
      <React.Fragment>
        <div ref="mapCanvas" style={{height: "100%"}}></div>
        <GoogleMapContext.Provider value={this.state.map}>{this.props.children}</GoogleMapContext.Provider>
      </React.Fragment>
		);
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.props.panTo || this.props.panTo === prevProps.panTo) return;
    this.panTo(this.props.panTo);
  }

  private panTo(bbox: BBox) {
    if (!this.state.map) return;
    const bounds = new LatLngBounds({lat: bbox[1], lng: bbox[0]}, {lat: bbox[3], lng: bbox[2]});
    this.state.map.fitBounds(bounds, 0);
  }
}

export default GoogleMap;
