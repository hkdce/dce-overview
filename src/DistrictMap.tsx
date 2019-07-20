import React from 'react';
import { connect } from 'react-redux';
import GoogleMap from './components/GoogleMap';
import GoogleMapGeoJSONOverlay from './components/GoogleMapGeoJSONOverlay';
import { ReduxState } from './Types';

export type DistrictFeatures = {[districtCode : string]: GeoJSON.Feature[]};

type StateProps = {
  districtFilter: string
}

type OwnProps = {
  layers: DistrictFeatures
}

type Props = StateProps & OwnProps;

const DistrictMap: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <GoogleMap>
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
