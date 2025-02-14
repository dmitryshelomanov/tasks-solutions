// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/674/

import { expect, test } from "vitest";

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * Given two integer arrays nums1 and nums2, return an array of their intersection.
 * Each element in the result must appear as many times as it shows
 * in both arrays and you may return the result in any order.
 *
 * #arrays, #hastable
 */
var intersect = function (nums1, nums2) {
  const map = new Map();
  const result = [];

  for (const n of nums1) {
    map.set(n, (map.get(n) || 0) + 1);
  }

  for (const n of nums2) {
    const count = map.get(n);

    if (count) {
      result.push(n);
      map.set(n, count - 1);
    }
  }

  return result;
};

test("intersect", () => {
  expect(intersect([3, 1, 2], [1, 1])).toEqual([1]);
  expect(intersect([1, 2, 2, 1], [2])).toEqual([2]);
  expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4]);
  expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4]);
});
