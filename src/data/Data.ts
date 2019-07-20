import { feature } from 'topojson';
import { DistrictFeatures, DistrictNames } from '../Types';

const dcca_2019_topojson: any = require('./dcca_2019-topo.json');
const dcca_2019_features: GeoJSON.Feature[] = dcca_2019_topojson.objects.dcca_2019.geometries.map((geo: any) => feature(dcca_2019_topojson, geo));

export const districtFeatures2019: DistrictFeatures = dcca_2019_features.reduce((output, feature) => {
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

export const districtNames: DistrictNames = require('./districts_name.json');
