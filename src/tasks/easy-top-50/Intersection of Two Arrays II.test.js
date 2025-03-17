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
  const rs = [];
  const map = new Map();

  for (let n of nums1) {
    if (!map.has(n)) {
      map.set(n, 1);
    }
  }

  for (let n of nums2) {
    if (map.has(n)) {
      rs.push(n);
      map.delete(n);
    }
  }

  return rs;
};

test("intersect", () => {
  expect(intersect([3, 1, 2], [1, 1])).toEqual([1]);
  expect(intersect([1, 2, 2, 1], [2])).toEqual([2]);
  expect(intersect([1, 2, 2, 1], [2, 2])).toEqual([2]);
  expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4]);
  expect(intersect([4, 9, 5], [9, 4, 9, 8, 4])).toEqual([9, 4]);
});
