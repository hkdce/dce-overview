import React from 'react';
import { connect } from 'react-redux';
import GoogleMap from './components/GoogleMap';
import GoogleMapGeoJSONOverlay from './components/GoogleMapGeoJSONOverlay';
import { ReduxState } from './Types';
import { feature } from 'topojson';

type DistrictFeatures = {[districtCode : string]: GeoJSON.Feature[]};

const dcca_2019_topojson: any = require('./data/dcca_2019-topo.json');
const dcca_2019_features: GeoJSON.Feature[] = dcca_2019_topojson.objects.dcca_2019.geometries.map((geo: any) => feature(dcca_2019_topojson, geo));

const districtFeatures2019: DistrictFeatures = dcca_2019_features.reduce((output, feature) => {
  if (feature == null || feature.properties == null || !feature.properties.hasOwnProperty('CACODE')) {
    console.warn('Bad GeoJSON feature', feature);
    return output;
  }
  const caCode: string = feature.properties['CACODE'];
  const districtCode = caCode.substring(0, 1);
  if (output.hasOwnProperty(districtCode)) {
    output[districtCode].push(feature);
  } else {
    output[districtCode] = [ feature ];
  }
  return output;
}, {} as DistrictFeatures);

type StateProps = {
  districtFilter: string;
  layers: DistrictFeatures;
}

type OwnProps = {
}

type Props = StateProps & OwnProps;

const districtColors: string[] = ['#544171', '#87D84A', '#CE572B', '#71D0C9', '#CC53D3', '#C59C76', '#5A8237', '#466158', '#D4B743', '#7199C7', '#C14088', '#7A6DCE', '#62471F', '#91D593', '#BF4C57', '#CC8BB9', '#C4BEBE', '#512834'];
const getColorFromDistrictCode = (districtCode: string): string => {
  var colorIndex: number = districtCode.charCodeAt(0) - 'A'.charCodeAt(0);
	if (districtCode >= 'I') colorIndex--;
  if (districtCode >= 'O') colorIndex--;
	return districtColors[colorIndex];
}

class DistrictMap extends React.Component<Props> {
  render() {
    var bbox: GeoJSON.BBox | null = null;
    const features = Object.values(this.props.layers).flat();
    features.forEach(feature => {
      if (!feature || !feature.properties || !feature.bbox) return;
      if (!feature.properties['CACODE'].startsWith(this.props.districtFilter)) return;
      if (!bbox) {
        bbox = Object.assign([], feature.bbox);
      } else {
        bbox[0] = Math.min(bbox[0], feature.bbox[0]);
        bbox[1] = Math.min(bbox[1], feature.bbox[1]);
        bbox[2] = Math.max(bbox[2], feature.bbox[2]);
        bbox[3] = Math.max(bbox[3], feature.bbox[3]);
      }
    });

    return (
      <GoogleMap panTo={bbox ? bbox : undefined}>
        {
          Object.keys(this.props.layers).map(districtCode =>
            <GoogleMapGeoJSONOverlay
              key={ districtCode }
              geojsons={ this.props.layers[districtCode] }
              color={ getColorFromDistrictCode(districtCode) }
              visible={ districtCode.startsWith(this.props.districtFilter)} />
          )
        }
      </GoogleMap>
    );
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return { districtFilter: state.districtFilter, layers: districtFeatures2019 };
};

export type DistrictMapType = DistrictMap;

const ConnectedDistrictMap = connect(mapStateToProps, null, null, { forwardRef: true })(DistrictMap);
export default ConnectedDistrictMap;
