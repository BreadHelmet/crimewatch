export class Login {
  static Actions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
  };

  static login() {
    return {
      type: Login.Actions.LOGIN,
    };
  }

  static logout() {
    localStorage.removeItem('access_token');
    return {
      type: Login.Actions.LOGOUT,
    };
  }
}
