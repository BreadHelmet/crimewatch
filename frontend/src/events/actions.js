
export class Events {
  static ACTION = {
    SET_EVENTS: 'SET_EVENTS',
    SET_EVENT: 'SET_EVENT',
    SET_VALUE: 'SET_VALUE',
  }
  static setEvents(events) {
    return {
      type: Events.ACTION.SET_EVENTS,
      events,
    };
  }
  static setEvent(event) {
    return {
      type: Events.ACTION.SET_EVENT,
      event,
    };
  }
  static setValue(key, val) {
    return {
      type: Events.ACTION.SET_VALUE,
      key,
      val,
    };
  }
}
