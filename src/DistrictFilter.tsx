import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectDistrictFilter } from './Actions';
import ItemsDropdown from './components/ItemsDropdown';
import { DistricNames, ReduxState } from './Types';

const districtFilterItems: DistricNames = require('./data/districts_name.json');
for (var key in districtFilterItems) {
  districtFilterItems[key] = key + " - " + districtFilterItems[key];
}
districtFilterItems[""] = "全香港";

const districtFilterOrder = Object.keys(districtFilterItems);
districtFilterOrder.sort();

type OwnProps = {
  className?: string;
}

type StateProps = {
  selectedKey: string;
}

type DispatchProps = {
  dispatch: Dispatch;
}

type Props = StateProps & OwnProps & DispatchProps

const DistrictFilter: React.FunctionComponent<Props> = (props: Props) => {
  return (<ItemsDropdown
            className={props.className}
            items={districtFilterItems}
            itemOrder={districtFilterOrder}
            selectedKey={props.selectedKey}
            onSelect={newItemKey => props.dispatch(selectDistrictFilter(newItemKey))}/>);
}

const mapStateToProps = (state: ReduxState) => {
  return { selectedKey: state.districtFilter };
};

const ConnectedDistrictFilter = connect(mapStateToProps)(DistrictFilter);
export default ConnectedDistrictFilter;
