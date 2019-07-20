export type DistrictFeatures = {[districtCode : string]: GeoJSON.Feature[]};
export type DistrictNames = { [index: string]: string };

export type ReduxState = {
  districtFilter: string;
  year: string;
};
