// https://leetcode.com/problems/create-hello-world-function/?envType=study-plan-v2&envId=30-days-of-javascript

import { test, expect } from "vitest";

/**
 * Write a function createHelloWorld. It should return a new function that always returns "Hello World".
 * @return {Function}
 */
var createHelloWorld = function () {
  return function () {
    return "Hello World";
  };
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

test("javascript/createHelloWorld", () => {
  const f = createHelloWorld();

  // Input: args = []
  // Output: "Hello World"
  // Explanation:
  // const f = createHelloWorld();
  // f(); // "Hello World"
  expect(f()).toBe("Hello World");

  //   Input: args = [{},null,42]
  // Output: "Hello World"
  // Explanation:
  // const f = createHelloWorld();
  expect(f({}, null, 42)).toBe("Hello World");
});
