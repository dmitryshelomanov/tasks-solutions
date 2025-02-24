// https://leetcode.com/problems/chunk-array/?envType=study-plan-v2&envId=30-days-of-javascript

import { expect, test } from "vitest";

/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  let index = 0;
  const countOfGroups = Math.ceil(arr.length / size);
  const result = Array.from({ length: countOfGroups }, () => []);

  while (index < arr.length) {
    result[Math.floor(index / size)].push(arr[index]);

    index++;
  }

  return result;
};

test("javascript/chunk", () => {
  expect(chunk([1, 2, 3, 4, 5], 1)).toEqual([[1], [2], [3], [4], [5]]);
  expect(chunk([1, 9, 6, 3, 2], 3)).toEqual([
    [1, 9, 6],
    [3, 2],
  ]);
});
