/// <reference types="googlemaps" />

import React from 'react';
import { BBox } from 'geojson';

declare const google: any;
const LatLngBounds = google.maps.LatLngBounds;

const deepEqual = require('deep-equal');

type State = {
  map: google.maps.Map | null;
  lastPanTo: BBox | null;
}

type OwnProps = {
  panTo?: BBox;
}

type Props = OwnProps;

export const GoogleMapContext = React.createContext<google.maps.Map | null>(null);

const isVisible = (e: HTMLElement): Boolean => {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

class GoogleMap extends React.Component<Props, State> {
  private map: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      map: null,
      lastPanTo: null
		};
  }

  componentDidMount() {
		if (this.state.map == null) {
      const map = new google.maps.Map(this.refs.mapCanvas as Element);
      this.setState({ map });
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
    if (!this.props.panTo || deepEqual(this.props.panTo, this.state.lastPanTo)) return;
    if (!this.state.map) return;
    if (!this.refs.mapCanvas || !isVisible(this.refs.mapCanvas as HTMLElement)) return;

    this.panTo(this.state.map, this.props.panTo);
    this.setState({
      lastPanTo: this.props.panTo
    });
  }

  private panTo(map: google.maps.Map, bbox: BBox) {
    const bounds = new LatLngBounds({lat: bbox[1], lng: bbox[0]}, {lat: bbox[3], lng: bbox[2]});
    map.fitBounds(bounds, 0);
  }
}

export default GoogleMap;
