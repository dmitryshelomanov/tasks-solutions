import { expect, test } from "vitest";

class EventEmitter {
  constructor() {
    this.handlers = {};
  }
  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = new Map();
    }

    this.handlers[eventName].set(callback, callback);

    return {
      unsubscribe: () => {
        this.handlers[eventName].delete(callback);
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    const rs = [];

    if (this.handlers[eventName]) {
      for (const callback of this.handlers[eventName].values()) {
        rs.push(callback(...args));
      }
    }

    return rs;
  }
}

test("javascript/ee/1", () => {
  // describe("test1", () => {
  //   const emitter = new EventEmitter();

  //   // Subscribe to the onClick event with onClickCallback
  //   function onClickCallback() {
  //     return 99;
  //   }
  //   const sub = emitter.subscribe("onClick", onClickCallback);

  //   expect(emitter.emit("onClick")).toEqual([99]); // [99]
  //   sub.unsubscribe(); // undefined
  //   expect(emitter.emit("onClick")).toEqual([]);
  // });

  const emitter = new EventEmitter();

  const sub1 = emitter.subscribe("firstEvent", (x) => x + 1);
  emitter.subscribe("firstEvent", (x) => x + 2);
  sub1.unsubscribe(); // undefined

  expect(emitter.emit("firstEvent", [5])).toEqual([7]);
});

test("javascript/ee/2", () => {
  const emitter = new EventEmitter();

  // Subscribe to the onClick event with onClickCallback
  function onClickCallback() {
    return 99;
  }
  const sub = emitter.subscribe("onClick", onClickCallback);

  expect(emitter.emit("onClick")).toEqual([99]); // [99]
  sub.unsubscribe(); // undefined
  expect(emitter.emit("onClick")).toEqual([]);
});
