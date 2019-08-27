export type DistrictOverlay = {[districtCode : string]: GeoJSON.Feature[]};
export type DistrictNames = { [index: string]: string };

export type DCCAInfo = {
  CACODE: string;
  ENAME: string;
  CNAME: string;
};

export type DistrictInfo = {
  [cacode: string]: DCCAInfo;
}

export type ReduxState = {
  page: string;
  district: string;
  dcca: string;
};
