import { createStore } from 'redux';
import rootReducer from 'redux/reducers/root';

const initialState = {
  loggedIn: true,
  events: null,
  event: null,
  scenes: null,
  scene: null,
};

const store = createStore(rootReducer, initialState);

export default store;
