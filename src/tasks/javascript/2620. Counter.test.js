// https://leetcode.com/problems/create-hello-world-function/?envType=study-plan-v2&envId=30-days-of-javascript

import { test, expect } from "vitest";

/**
 * @param {number} n
 * @return {Function} counter
 * Given an integer n, return a counter function.
 * This counter function initially returns n and then returns
 * 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).
 */
var createCounter = function (n) {
  return function () {
    return n++;
  };
};

test("javascript/createCounter/1", () => {
  const counter = createCounter(10);

  expect(counter()).toBe(10);
  expect(counter()).toBe(11);
  expect(counter()).toBe(12);
});
