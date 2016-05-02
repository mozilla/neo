import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux'
import { combineReducers } from 'redux-immutable';
import * as Immutable from 'immutable';
import routes from './routes';
import { store as devtoolsStore } from './app/devtools';
import Layout from './components/layout';

const initialState = Immutable.fromJS(Object.create(null));
const routerReducer = (state = initialState, action) => {
  return action.type === LOCATION_CHANGE ?
    state.merge({ locationBeforeTransitions: action.payload }) : state;
};
const store = createStore(
  combineReducers({ routing: routerReducer }),
  initialState,
  devtoolsStore
);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing').toJS()
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Layout}>
        {routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
