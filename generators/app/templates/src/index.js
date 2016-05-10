import { renderApp, createApp } from './app';
import routes from './routes';
import Layout from './components/layout';

const reducers = {
  title: state => state
};
const initialState = {
  title: '<%= data.appTitle %>'
};
const app = createApp(reducers, initialState);

renderApp(app, Layout, routes);
