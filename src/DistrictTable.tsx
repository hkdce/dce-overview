import React from 'react';
import { BootstrapTable, SelectRow, SelectRowMode, SortOrder, TableHeaderColumn } from 'react-bootstrap-table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DistrictInfo, ReduxState } from './Types';
import { selectDCCA } from './Actions';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

type StateProps = {
  selectedDistrict: string;
  selectedDCCA: string;
}

type OwnProps = {
  districtInfo: DistrictInfo;
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
  const caCodes = props.districtInfo ? Object.keys(props.districtInfo) : [];
  const dccaList = caCodes
    .filter(caCode => caCode.startsWith(props.selectedDistrict))
    .flatMap(caCode => props.districtInfo[caCode]);

  const selectRowProp: SelectRow = {
    mode: 'radio' as SelectRowMode,
    bgColor: '#78deee',
    clickToSelect: true,
    selected: [ props.selectedDCCA ],
    onSelect: (row, isSelected: boolean) => { if (isSelected) props.dispatch(selectDCCA(row['CACODE'])) }
  };

  return (
    <BootstrapTable condensed={ true } data={ dccaList as object[] } options={ tableOptions } selectRow={ selectRowProp } version='4'>
      <TableHeaderColumn isKey dataField='CACODE' dataSort={ true }>選區編號</TableHeaderColumn>
      <TableHeaderColumn dataField='CNAME' dataSort={ true }>中文名稱</TableHeaderColumn>
      <TableHeaderColumn dataField='ENAME' dataSort={ true }>English Name</TableHeaderColumn>
    </BootstrapTable>
  );
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    selectedDistrict: state.district,
    selectedDCCA: state.dcca
  };
};

const ConnectedDistrictTable = connect(mapStateToProps, null, null, { forwardRef: true })(DistrictTable);
export default ConnectedDistrictTable;
