import { createReducer } from 'redux-starter-kit';
import { ReduxState } from './Types';
import { selectDistrictFilter, selectYear } from './Actions';

export const initialState: ReduxState = {
  districtFilter: "",
  year: ""
}

const reducers = createReducer<ReduxState>(initialState, {
  [selectDistrictFilter.type]: (state: ReduxState, action) => { state.districtFilter = action.payload },
  [selectYear.type]: (state: ReduxState, action) => { state.year = action.payload }
});

export default reducers;
