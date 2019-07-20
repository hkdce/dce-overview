import React from 'react';
import { connect } from 'react-redux';
import GoogleMap from './components/GoogleMap';
import GoogleMapGeoJSONOverlay from './components/GoogleMapGeoJSONOverlay';
import { ReduxState } from './Types';
import { BBox } from 'geojson';

export type DistrictFeatures = {[districtCode : string]: GeoJSON.Feature[]};

type State = {
}

type StateProps = {
  districtFilter: string;
}

type OwnProps = {
  layers: DistrictFeatures;
}

type Props = StateProps & OwnProps;

const DistrictMap: React.FunctionComponent<Props> = (props) => {
  var bbox: GeoJSON.BBox | null = null;
  const features = Object.values(props.layers).flat();
  features.forEach(feature => {
    if (!feature || !feature.properties || !feature.bbox) return;
    if (!feature.properties["CACODE"].startsWith(props.districtFilter)) return;
    if (!bbox) {
      bbox = Object.assign([], feature.bbox);
    } else {
      bbox[0] = Math.min(bbox[0], feature.bbox[0]);
      bbox[1] = Math.min(bbox[1], feature.bbox[1]);
      bbox[2] = Math.max(bbox[2], feature.bbox[2]);
      bbox[3] = Math.max(bbox[3], feature.bbox[3]);
    }
    //console.log(props.districtFilter, feature.properties["CACODE"], bbox, feature);
  });

  return (
    <GoogleMap panTo={bbox ? bbox : undefined}>
      {
        Object.keys(props.layers).map(districtCode =>
          <GoogleMapGeoJSONOverlay
            key={ districtCode }
            geojsons={ props.layers[districtCode] }
            visible={ districtCode.startsWith(props.districtFilter)} />
        )
      }
    </GoogleMap>
  );
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return { districtFilter: state.districtFilter };
};

const ConnectedDistrictMap = connect(mapStateToProps)(DistrictMap);
export default ConnectedDistrictMap;
