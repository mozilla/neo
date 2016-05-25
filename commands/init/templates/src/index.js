import App from 'mozilla-neo';
import routes from './routes';
import Layout from './layout';

export const reducers = {
  title: state => state
};

export const initialState = {
  title: '<%= data.appTitle %>'
};

export default App({ reducers, initialState, Layout, routes });
