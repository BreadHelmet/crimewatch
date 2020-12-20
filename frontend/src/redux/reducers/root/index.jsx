import { combineReducers } from "redux";
import login from 'redux/reducers/login';
import { events, event } from 'events/reducers';
import { scenes, scene } from 'scenes/reducers';
import { actors, actor } from 'actors/reducers';
import { props, prop } from 'props/reducers';

export default combineReducers({
  loggedIn: login,
  events,
  event,
  scenes,
  scene,
  actors,
  actor,
  props,
  prop,
});
