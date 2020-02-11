import { ActionTypes } from 'redux/actions/incidents';

export function incidents(state = {}, action) {
  
  switch (action.type) {
    case ActionTypes.SET_INCIDENTS:
      const { incidents } = action;
      // console.log('in incidents reducer', action.incident );
      return {
        ...state,
        ...incidents,
      };//Object.assign({}, state, action.incidents);//{ ...state, incidents: action.incidents };
    default:
      return state;
  }
}

export default incidents;
