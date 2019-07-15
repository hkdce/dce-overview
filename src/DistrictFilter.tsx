import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createReducer } from 'redux-starter-kit';
import { changeFilter } from './Actions';
import ItemsDropdown from './components/ItemsDropdown';
import { ReduxState } from './Types';

type OwnProps = {
  items: { [index: string]: string };
  itemOrder: string[];
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
            items={props.items}
            itemOrder={props.itemOrder}
            selectedKey={props.selectedKey}
            onSelect={newItemKey => props.dispatch(changeFilter(newItemKey))}/>);
}

const mapStateToProps = (state: ReduxState) => {
  return { selectedKey: state.districtFilter };
};

export const reducers = createReducer<ReduxState>({ districtFilter: "" }, {
  changeFilter: (state, action) => { return { districtFilter: action.payload }}
});

const ConnectedDistrictFilter = connect(mapStateToProps)(DistrictFilter);
export { ConnectedDistrictFilter as DistrictFilter };
