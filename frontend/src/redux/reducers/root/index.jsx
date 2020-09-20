import { combineReducers } from "redux";
import login from 'redux/reducers/login';
import { incidents, incident } from 'redux/reducers/incidents';

export default combineReducers({
  loggedIn: login,
  incidents,
  incident,
});
