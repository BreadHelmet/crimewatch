import { Login } from 'redux/actions/login';
import store from '../../store';

const { dispatch } = store;

export function logOut() {
  console.log('logOut');
  dispatch(Login.logout());
}
