// https://leetcode.com/problems/flatten-deeply-nested-array/description/?envType=study-plan-v2&envId=30-days-of-javascript

import { expect, test } from "vitest";

/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flatRec = function (arr, n) {
  if (n <= 0) {
    return arr;
  }

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatRec(val, n - 1));
    } else {
      acc.push(val);
    }

    return acc;
  }, []);
};

test("javascript/flat", () => {
  expect(
    flatRec([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1)
  ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]);
  expect(
    flatRec([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 10)
  ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
});
