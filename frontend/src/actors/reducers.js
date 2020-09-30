import { Actors } from './actions';

export function actors(state={}, action) {
  switch (action.type) {
    case Actors.ACTION.SET_ACTORS:
      return action.actors;
    default:
      return state;
  }
}

export function actor(state={}, action) {
  switch (action.type) {
    case Actors.ACTION.SET_ACTOR:
      return action.actor;
    case Actors.ACTION.SET_VALUE:
      return {
        ...state,
        [action.key]: action.val,
      };
    default:
      return state;
  }
}
