import { createReducer } from 'redux-starter-kit';
import { ReduxState } from './Types';
import { selectDistrict, selectPage, selectDCCA } from './Actions';

export const initialState: ReduxState = {
  page: '',
  district: '',
  dcca: ''
}

const reducers = createReducer<ReduxState>(initialState, {
  [selectPage.type]: (state: ReduxState, action) => { state.page = action.payload },
  [selectDistrict.type]: (state: ReduxState, action) => { state.district = action.payload },
  [selectDCCA.type]: (state: ReduxState, action) => { state.dcca = action.payload }
});

export default reducers;
