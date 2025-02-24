// https://leetcode.com/problems/chunk-array/?envType=study-plan-v2&envId=30-days-of-javascript

import { expect, test } from "vitest";

/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  const result = {};

  for (let i = 0; i < this.length; i++) {
    const key = fn(this[i]);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(this[i]);
  }

  return result;
};

test("javascript/groupBy", () => {
  expect([{ id: "1" }, { id: "1" }, { id: "2" }].groupBy((i) => i.id)).toEqual({
    1: [{ id: "1" }, { id: "1" }],
    2: [{ id: "2" }],
  });
});
