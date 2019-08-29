export type Candidate = {
  year: number,
  caCode: string,
  name: string,
  gender: string,
  yearOfBirth: number | null,
  occupation: string | null,
  hasWon: boolean,
  isUncontested: boolean,
  politicalAffiliation: string | null,
  camp: string,
  votes: number,
  votePercentage: number
};

export type DistrictOverlay = {[districtCode : string]: GeoJSON.Feature[]};
export type DistrictNames = { [index: string]: string };

export type DCCAInfo = {
  CACODE: string;
  ENAME: string;
  CNAME: string;
};

export type DistrictInfo = {
  dccaList: { [cacode: string]: DCCAInfo },
  candidates?: { [cacode: string]: Candidate[] };
}

export type ReduxState = {
  page: string;
  district: string;
  dcca: string;
};
