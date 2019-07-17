import React from 'react';

declare const google: any;



type State = {
  attached: boolean;
}

type StateProp = {

}

type Prop = StateProp;

class Map extends React.Component<Prop, State> {
  private map: any;

  constructor(props: Prop) {
    super(props);
    this.state = {
			attached: false,
		};
  }

  componentDidMount() {
		if (!this.state.attached) {
			var mapOptions = {
				center: { lat: 22.3300, lng: 114.1880},
				zoom: 11,
      };
      this.map = new google.maps.Map(this.refs.mapCanvas, mapOptions);
      this.setState({attached: false});
		}
  }

  render() {
		return (
      <div ref="mapCanvas" style={{height: "40em"}}></div>
		);
	}
}

export default Map;
