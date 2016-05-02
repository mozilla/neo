import React from 'react';
import { compose } from 'redux';
import { createDevTools, persistState } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';

const IS_PROD = process.env.NODE_ENV !== 'development';

export let tools = IS_PROD ? '' : createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
    defaultVisible="true">
    <LogMonitor />
    <SliderMonitor />
    <ChartMonitor />
  </DockMonitor>
);

export let store = IS_PROD ? null : compose(
  window.devToolsExtension ? window.devToolsExtension() : tools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
);
