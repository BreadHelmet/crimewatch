
export const ActionTypes = {
  SET_LOGGED_IN: 'SET_LOGGED_IN',
};

export function setLoggedIn(loggedIn) {
  // console.group('setLoggedIn');
  // console.log({loggedIn});
  // console.groupEnd();
  return {
    type: ActionTypes.SET_LOGGED_IN,
    loggedIn,
  };
}

export default {
  ActionTypes,
  setLoggedIn,
};
