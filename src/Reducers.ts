import { createReducer } from 'redux-starter-kit';
import { ReduxState } from './Types';
import { selectDistrict, selectYear, selectDCCA } from './Actions';

export const initialState: ReduxState = {
  year: '',
  district: '',
  dcca: ''
}

const reducers = createReducer<ReduxState>(initialState, {
  [selectYear.type]: (state: ReduxState, action) => { state.year = action.payload },
  [selectDistrict.type]: (state: ReduxState, action) => { state.district = action.payload },
  [selectDCCA.type]: (state: ReduxState, action) => { state.dcca = action.payload }
});

export default reducers;
