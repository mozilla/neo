require('expose?$!expose?jQuery!jquery')
require('expose?Tether!tether')
require('bootstrap')
require("./index.scss")

import React from 'react'
import {renderApp, createApp} from 'neo'

import Home from './home'

const Routes = [
  { path: '/', title: 'Home', component: Home }
];

const Layout = ({ children }) => (
  <div id="content">{children}</div>
)

const App = createApp(
  {}, // <- reducers
  {}  // <- initial state
)

renderApp(App, Layout, Routes)
