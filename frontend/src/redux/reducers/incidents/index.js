import { ActionTypes } from 'redux/actions/incidents';

export function incidents(state = {}, action) {
  const { incidents } = action;
  switch (action.type) {
    case ActionTypes.SET_INCIDENTS:
      return incidents;
    default:
      return state;
  }
}

export function incident(state = {}, action) {
  const { type, incident } = action;
  switch (type) {
    case ActionTypes.SET_INCIDENT:
      return incident;
    default:
      return state;
  }
}
