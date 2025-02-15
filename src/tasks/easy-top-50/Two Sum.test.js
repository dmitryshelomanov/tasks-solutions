// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/546/
import { expect, test } from "vitest";

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution,
and you may not use the same element twice.
You can return the answer in any order.

#arrays, #hashtable
 */

var twoSum = function (nums, target) {
  // O (n^2)
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = i + 1; j < nums.length; j++) {
  //     if (nums[i] + nums[j] === target) {
  //       return [i, j];
  //     }
  //   }
  // }

  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }

    map.set(nums[i], i);
  }
};

test("twoSum", () => {
  expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  expect(twoSum([0, 0, 0, 0, 10, 0, 0, 0, 0, 10], 20)).toEqual([4, 9]);
  expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
  expect(twoSum([20, 20, 4, 4, 2, 2], 4)).toEqual([4, 5]);
});
