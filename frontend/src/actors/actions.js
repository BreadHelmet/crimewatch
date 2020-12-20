
export class Actors {
  static ACTION = {
    SET_ACTORS: 'SET_ACTORS',
    SET_ACTOR: 'SET_ACTOR',
    SET_VALUE: 'SET_VALUE',
  }
  static setActors(actors) {
    return {
      type: Actors.ACTION.SET_ACTORS,
      actors,
    };
  }
  static setActor(actor) {
    return {
      type: Actors.ACTION.SET_ACTOR,
      actor,
    };
  }
  static setValue(key, val) {
    return {
      type: Actors.ACTION.SET_VALUE,
      key,
      val,
    };
  }
}
