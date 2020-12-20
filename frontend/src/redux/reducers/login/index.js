import { Login } from 'redux/actions/login';

export function login(state={}, action) {
  switch (action.type) {
    case Login.Actions.LOGIN:
      return true;
    case Login.Actions.LOGOUT:
      return false;
    default:
      return state;
  }
}

export default login;
