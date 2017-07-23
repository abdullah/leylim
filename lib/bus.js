let _handlers = [];

/**
 * Bus is an implementation of observable pattern
 * that handle all component communication.
 *
 * @export
 * @class Bus
 */
export default class Bus {
  static get handlers() {
    return _handlers;
  }

  static subscribe(fn) {
    _handlers.push(fn);
  }

  static unsubscribe(fn) {
    _handlers = _handlers.filter(item => item !== fn);
  }
  static fire(eventName, params, thisObj) {
    var scope = thisObj || window;
    _handlers.forEach(item => {
      item.call(scope, eventName, params);
    });
  }
}
