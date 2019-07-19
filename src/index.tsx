import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import App from './App';
import './index.css';
import Reducers, { initialState } from './Reducers';
import * as serviceWorker from './serviceWorker';
import { ReduxState } from './Types';
import { selectYear, selectDistrictFilter } from './Actions';

const ReduxQuerySync = require('redux-query-sync').default;

const store = configureStore({
  reducer: Reducers
});

ReduxQuerySync({
  store, // your Redux store
  params: {
    year: {
      selector: (state: ReduxState) => state.year,
      action: (value: string) => selectYear(value),
      defaultValue: initialState.year
    },
    districtFilter: {
      selector: (state: ReduxState) => state.districtFilter,
      action: (value: string) => selectDistrictFilter(value),
      defaultValue: initialState.districtFilter
    },
  },
  // Initially set the store's state to the current location.
  initialTruth: 'location',
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
