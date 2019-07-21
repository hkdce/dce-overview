export type DistrictFeatures = {[districtCode : string]: GeoJSON.Feature[]};
export type DistrictNames = { [index: string]: string };

export type ReduxState = {
  year: string;
  district: string;
  dcca: string;
};
