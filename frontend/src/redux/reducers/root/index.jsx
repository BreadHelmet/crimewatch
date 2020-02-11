import { combineReducers } from "redux";
import login from 'redux/reducers/login';
import incidents from 'redux/reducers/incidents';

export default combineReducers({
  loggedIn: login,
  incidents,
});
