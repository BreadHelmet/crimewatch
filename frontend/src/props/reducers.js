import { Props } from './actions';

export function props(state={}, action) {
  switch (action.type) {
    case Props.ACTION.SET_PROPS:
      return action.props;
    default:
      return state;
  }
}

export function prop(state={}, action) {
  switch (action.type) {
    case Props.ACTION.SET_PROP:
      return action.prop;
    case Props.ACTION.SET_VALUE:
      return {
        ...state,
        [action.key]: action.val,
      };
    default:
      return state;
  }
}
