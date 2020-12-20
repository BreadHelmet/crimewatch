
export class Scenes {
  static ACTION = {
    SET_SCENES: 'SET_SCENES',
    SET_SCENE: 'SET_SCENE',
    SET_VALUE: 'SET_VALUE',
  }
  static setScenes(scenes) {
    return {
      type: Scenes.ACTION.SET_SCENES,
      scenes,
    };
  }
  static setScene(scene) {
    return {
      type: Scenes.ACTION.SET_SCENE,
      scene,
    };
  }
  static setValue(key, val) {
    return {
      type: Scenes.ACTION.SET_VALUE,
      key,
      val,
    };
  }
}
