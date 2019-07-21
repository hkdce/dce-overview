import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectDistrict } from './Actions';
import ItemsDropdown from './components/ItemsDropdown';
import { DistrictNames, ReduxState } from './Types';
import { districtNames } from './data/Data';

const districtFilterItems: DistrictNames = Object.assign({}, districtNames);
for (var key in districtFilterItems) {
  districtFilterItems[key] = key + ' - ' + districtFilterItems[key];
}
districtFilterItems[''] = '全香港';

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

type Props = StateProps & OwnProps & DispatchProps;

const DistrictFilter: React.FunctionComponent<Props> = (props) => {
  return (<ItemsDropdown
            className={ props.className }
            items={ districtFilterItems }
            itemOrder={ districtFilterOrder }
            selectedKey={ props.selectedKey }
            onSelect={ newItemKey => props.dispatch(selectDistrict(newItemKey)) }/>);
}

const mapStateToProps = (state: ReduxState) => {
  return { selectedKey: state.district };
};

const ConnectedDistrictFilter = connect(mapStateToProps)(DistrictFilter);
export default ConnectedDistrictFilter;
