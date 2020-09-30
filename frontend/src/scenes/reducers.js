import { Scenes } from './actions';

export function scenes(state={}, action) {
  switch (action.type) {
    case Scenes.ACTION.SET_SCENES:
      return action.scenes;
    default:
      return state;
  }
}

export function scene(state={}, action) {
  switch (action.type) {
    case Scenes.ACTION.SET_SCENE:
      return action.scene;
    case Scenes.ACTION.SET_VALUE:
      return {
        ...state,
        [action.key]: action.val,
      };
    default:
      return state;
  }
}
