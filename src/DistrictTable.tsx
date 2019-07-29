import React from 'react';
import { BootstrapTable, SortOrder, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { districtFeatures } from './data/Data';
import { DistrictFeatures, ReduxState } from './Types';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

type StateProps = {
  page: string;
  districtFilter: string;
  layers: DistrictFeatures;
}

type OwnProps = {
}

type DispatchProps = {
  dispatch: Dispatch;
}

type Props = StateProps & OwnProps & DispatchProps;

const tableOptions = {
  defaultSortName: 'CACODE',
  defaultSortOrder: 'asc' as SortOrder
};

const DistrictTable: React.FunctionComponent<Props> = (props) => {
  const features = Object.values(props.layers).flat();
  const filteredDistrict = features
    .map(f => f.properties)
    .filter(p => p != null && (p['CACODE'] as string).startsWith(props.districtFilter));
  return (
    <BootstrapTable condensed={ true } data={ filteredDistrict as object[] } options={ tableOptions } version='4'>
      <TableHeaderColumn isKey dataField='CACODE' dataSort={ true }>選區代號</TableHeaderColumn>
      <TableHeaderColumn dataField='CNAME' dataSort={ true }>中文名稱</TableHeaderColumn>
      <TableHeaderColumn dataField='ENAME' dataSort={ true }>English Name</TableHeaderColumn>
    </BootstrapTable>
  );
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    page: state.page,
    districtFilter: state.district,
    layers: state.page === '' ? {} : districtFeatures[state.page]
  };
};

const ConnectedDistrictTable = connect(mapStateToProps, null, null, { forwardRef: true })(DistrictTable);
export default ConnectedDistrictTable;
