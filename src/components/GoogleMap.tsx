/// <reference types="googlemaps" />

import React from 'react';

declare const google: any;

type State = {
  map: google.maps.Map | null;
}

type OwnProps = {
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
      const map = new google.maps.Map(this.refs.mapCanvas, mapOptions);
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
}

export default GoogleMap;
