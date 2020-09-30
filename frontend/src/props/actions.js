
export class Props {
  static ACTION = {
    SET_PROPS: 'SET_PROPS',
    SET_PROP: 'SET_PROP',
    SET_VALUE: 'SET_VALUE',
  }
  static setProps(props) {
    return {
      type: Props.ACTION.SET_PROPS,
      props,
    };
  }
  static setProp(prop) {
    return {
      type: Props.ACTION.SET_PROP,
      prop,
    };
  }
  static setValue(key, val) {
    return {
      type: Props.ACTION.SET_VALUE,
      key,
      val,
    };
  }
}
