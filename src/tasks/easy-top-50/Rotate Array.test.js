// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/646/
import { expect, test } from "vitest";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 *
 * Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.
 * #in_place, #arrays
 * Полезный хак когда нужно менять все по кругу
 * (i + k) % nums.length
 * где % это remainder operator (x - Math.floor(x/y) * y)
 */
var rotate = function (nums, k) {
  const result = Array.from({ length: nums.length });

  for (let i = 0; i < nums.length; i++) {
    result[(i + k) % nums.length] = nums[i];
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = result[i];
  }

  return result;
};

test("rotate", () => {
  expect(rotate([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([5, 6, 7, 1, 2, 3, 4]);
  expect(rotate([-1, -100, 3, 99], 2)).toEqual([3, 99, -1, -100]);
  expect(rotate([1], 2)).toEqual([1]);
  expect(rotate([1, 2], 3)).toEqual([2, 1]);
});
