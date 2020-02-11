import { ActionTypes } from 'redux/actions/login';

export function login(state = null, action = {}) {
  
  switch (action.type) {
    case ActionTypes.SET_LOGGED_IN:
      const { loggedIn } = action;
      return {
        ...state,
        loggedIn,
      };
    default:
      return state;
  }
}

export default login;
