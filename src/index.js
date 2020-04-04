import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { browserHistory, Router } from "react-router";
import { syncHistoryWithStore } from 'react-router-redux';

import all from './reducers';
import routes from "./routes";

const store = createStore(all);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('body'));
