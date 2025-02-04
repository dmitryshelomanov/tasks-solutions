import { expect, test } from "vitest";

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

test("Currying works ", () => {
  function add(a, b) {
    return a + b;
  }

  const addCurried = curry(add);

  expect(addCurried(1)(2)).toEqual(3);
});
