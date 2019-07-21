import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import App from './App';
import './index.css';
import Reducers, { initialState } from './Reducers';
import * as serviceWorker from './serviceWorker';
import { ReduxState } from './Types';
import { selectPage, selectDistrict, selectDCCA } from './Actions';

const ReduxQuerySync = require('redux-query-sync').default;

const store = configureStore({
  reducer: Reducers
});

ReduxQuerySync({
  store, // your Redux store
  params: {
    page: {
      selector: (state: ReduxState) => state.page,
      action: (value: string) => selectPage(value),
      defaultValue: initialState.page
    },
    district: {
      selector: (state: ReduxState) => state.district,
      action: (value: string) => selectDistrict(value),
      defaultValue: initialState.district
    },
    dcca: {
      selector: (state: ReduxState) => state.dcca,
      action: (value: string) => selectDCCA(value),
      defaultValue: initialState.dcca
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
