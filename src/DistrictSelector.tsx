import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectDistrict } from './Actions';
import ItemsDropdown from './components/ItemsDropdown';
import { DistrictNames, ReduxState } from './Types';
import { districtNames } from './data/Data';

const districtItems: DistrictNames = Object.assign({}, districtNames);
for (var key in districtItems) {
  districtItems[key] = key + ' - ' + districtItems[key];
}
districtItems[''] = '全香港';

const districtItemsOrder = Object.keys(districtItems);
districtItemsOrder.sort();

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

const DistrictSelector: React.FunctionComponent<Props> = (props) => {
  return (<ItemsDropdown
            className={ props.className }
            items={ districtItems }
            itemOrder={ districtItemsOrder }
            selectedKey={ props.selectedKey }
            onSelect={ newItemKey => props.dispatch(selectDistrict(newItemKey)) }/>);
}

const mapStateToProps = (state: ReduxState) => {
  return { selectedKey: state.district };
};

const ConnectedDistrictSelector = connect(mapStateToProps)(DistrictSelector);
export default ConnectedDistrictSelector;
