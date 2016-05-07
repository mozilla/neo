import Immutable from 'immutable';
import React from 'react';  // needed for jsx to work
import ReactDOM from 'react-dom'
import { LOCATION_CHANGE, syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { combineReducers } from 'redux-immutable';
import { compose, createStore } from 'redux';
import { createDevTools, persistState } from 'redux-devtools';

import ChartMonitor from 'redux-devtools-chart-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';

let DEVTOOLS_STORE;
let DEVTOOLS = () => null;

if (process.env.NODE_ENV === 'development') {
  DEVTOOLS = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                changePositionKey="ctrl-q"
                changeMonitorKey="ctrl-m"
                defaultVisible="true"
                >
      <LogMonitor />
      <SliderMonitor />
      <ChartMonitor />
    </DockMonitor>
  );
  DEVTOOLS_STORE = compose(
    window.devToolsExtension ? window.devToolsExtension() : DEVTOOLS.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  );
}


export const createApp = (reducers, initialState) => {
  reducers = reducers || {};
  initialState = Immutable.fromJS(initialState || {});

  const routerReducer = (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
      return state.merge({ locationBeforeTransitions: action.payload });
    }
    return state;
  };

  const store = createStore(
    combineReducers({ ...reducers, routing: routerReducer }),
    initialState,
    DEVTOOLS_STORE
  );

  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: state => state.get('routing').toJS()
  });

  return { store, history };
};


export const renderApp = (App, Layout, routes, rootElemenent) => {
  rootElemenent = rootElemenent || document.getElementById('app')
  const LayoutWrapper = (props) => (
    <div id="wrapper">
      <Layout {...props}/>
      <DEVTOOLS/>
    </div>
  );
  ReactDOM.render((
    <Provider store={App.store}>
      <Router history={App.history}>
        <Route component={LayoutWrapper}>
          {routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
        </Route>
      </Router>
    </Provider>
  ), rootElemenent)
}
