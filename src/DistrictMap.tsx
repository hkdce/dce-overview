import { BBox } from 'geojson';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoogleMap from './components/GoogleMap';
import GoogleMapGeoJSONOverlay from './components/GoogleMapGeoJSONOverlay';
import { districtColors, districtFeatures } from './data/Data';
import { DistrictFeatures, ReduxState } from './Types';
import { selectDCCA } from './Actions';

type StateProps = {
  selectedDistrict: string;
  layers: DistrictFeatures;
}

type OwnProps = {
}

type DispatchProps = {
  dispatch: Dispatch;
}

type Props = StateProps & OwnProps & DispatchProps;

const getColorFromDistrictCode = (districtCode: string): string => {
  var colorIndex: number = districtCode.charCodeAt(0) - 'A'.charCodeAt(0);
	if (districtCode >= 'I') colorIndex--;
  if (districtCode >= 'O') colorIndex--;
	return districtColors[colorIndex];
}

const calculateBboxOfFilteredDistrict = (layers: DistrictFeatures, selectedDistrict: string): BBox | null => {
  var bbox: GeoJSON.BBox | null = null;
  const features = Object.values(layers).flat();
  features.forEach(feature => {
    if (!feature || !feature.properties || !feature.bbox) return;
    if (!feature.properties['CACODE'].startsWith(selectedDistrict)) return;
    if (!bbox) {
      bbox = feature.bbox;
    } else {
      bbox = [ Math.min(bbox[0], feature.bbox[0]),
               Math.min(bbox[1], feature.bbox[1]),
               Math.max(bbox[2], feature.bbox[2]),
               Math.max(bbox[3], feature.bbox[3]) ];
    }
  });

  return bbox;
}

class DistrictMap extends React.Component<Props> {
  render() {
    const bbox = calculateBboxOfFilteredDistrict(this.props.layers, this.props.selectedDistrict);
    return (
      <GoogleMap panTo={ bbox ? [ this.props.selectedDistrict, bbox ] : undefined }>
        {
          Object.keys(this.props.layers).map(districtCode =>
            <GoogleMapGeoJSONOverlay
              key={ districtCode }
              geojsons={ this.props.layers[districtCode] }
              color={ getColorFromDistrictCode(districtCode) }
              visible={ districtCode.startsWith(this.props.selectedDistrict)}
              highlightOnMouseOver={ true }
              onFeatureClick={ this.onFeatureClick.bind(this) }/>
          )
        }
      </GoogleMap>
    );
  }

  onFeatureClick(feature: google.maps.Data.Feature) {
    const caCode = feature.getProperty('CACODE');
    this.props.dispatch(selectDCCA(caCode));
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    selectedDistrict: state.district,
    layers: state.page === '' ? {} : districtFeatures[state.page]
  };
};

export type DistrictMapType = DistrictMap;

const ConnectedDistrictMap = connect(mapStateToProps, null, null, { forwardRef: true })(DistrictMap);
export default ConnectedDistrictMap;
