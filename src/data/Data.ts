import { feature } from 'topojson';
import { DistrictFeatures, DistrictNames } from '../Types';

const dcca_2019_topojson: any = require('./dcca_2019-topo.json');
const dcca_2019_features: GeoJSON.Feature[] = dcca_2019_topojson.objects.dcca_2019.geometries.map((geo: any) => feature(dcca_2019_topojson, geo));

export const districtColors: string[] = [ '#544171', '#87D84A', '#CE572B', '#71D0C9', '#CC53D3', '#C59C76', '#5A8237', '#466158', '#D4B743', '#7199C7', '#C14088', '#7A6DCE', '#62471F', '#91D593', '#BF4C57', '#CC8BB9', '#C4BEBE', '#512834' ];

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
