import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import lang from './lang';
import user from './user';

const all = combineReducers({
  routing: routerReducer,
  lang,
  user
});

export default all;