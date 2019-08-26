import { feature } from 'topojson';
import { DistrictFeatures, DistrictNames } from '../Types';

export const districtColors: string[] = [ '#544171', '#87D84A', '#CE572B', '#71D0C9', '#CC53D3', '#C59C76', '#5A8237', '#466158', '#D4B743', '#7199C7', '#C14088', '#7A6DCE', '#62471F', '#91D593', '#BF4C57', '#CC8BB9', '#C4BEBE', '#512834' ];

const loadTopoJson = (topo: any): DistrictFeatures => {
  const features: GeoJSON.Feature[] = topo.objects['-'].geometries.map((geo: any) => feature(topo, geo));

  return features.reduce((output, feature) => { // Group by CACODE first letter.
    if (feature == null || feature.properties == null || !feature.properties.hasOwnProperty('CACODE')) {
      console.error('Bad GeoJSON feature', feature);
      throw Error('Bad GeoJSON feature' + feature);
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
};

export const districtFeatures: { [page: string]: DistrictFeatures } = {
  '2015': loadTopoJson(require('./dcca_2015-topo.json')),
  '2019': loadTopoJson(require('./dcca_2019-topo.json'))
};

export const districtNames: DistrictNames = require('./districts_name.json');

export type DCCAData = {
  CACODE: string;
  ENAME: string;
  CNAME: string;
};

export type DCCAJson = {
  [cacode: string]: DCCAData;
}

export const dccaData: { [page: string]: DCCAJson } = {
  '2015': require('./dcca_2015.json'),
  '2019': require('./dcca_2019.json')
};
