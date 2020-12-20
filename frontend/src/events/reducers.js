import { Events } from 'events/actions';

export function events(state={}, action) {
  switch (action.type) {
    case Events.ACTION.SET_EVENTS:
      return action.events;
    default:
      return state;
  }
}

export function event(state={}, action) {
  switch (action.type) {
    case Events.ACTION.SET_EVENT:
      return action.event;
    case Events.ACTION.SET_VALUE:
      return {
        ...state,
        [action.key]: action.val,
      };
    default:
      return state;
  }
}
