// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/549/
import { expect, test } from "vitest";

/**
 * 
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.
 * @param {number[]} nums
 * @return {boolean}
 *
 * #arrays, #hastable
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums = []) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
  }

  const keys = map.keys();

  for (let key of keys) {
    if (map.get(key) === 1) {
      return key;
    }
  }
};

test("singleNumber", () => {
  expect(singleNumber([4, 1, 2, 1, 2])).toEqual(4);
});
