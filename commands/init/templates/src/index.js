import { create, render } from 'mozilla-neo';
import routes from './routes';
import Layout from './layout';

const reducers = {
  title: state => state
};
const initialState = {
  title: '<%= data.appTitle %>'
};

render(
  create(reducers, initialState),
  Layout,
  routes
);
