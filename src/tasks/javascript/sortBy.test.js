// https://leetcode.com/problems/sort-by/?envType=study-plan-v2&envId=30-days-of-javascript

import { expect, test } from "vitest";

/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  return arr.sort((x, y) => fn(x) - fn(y));
};

test("javascript/groupBy", () => {
  expect(sortBy([5, 4, 1, 2, 3], (x) => x)).toEqual([1, 2, 3, 4, 5]);
});
