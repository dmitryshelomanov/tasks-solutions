// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/578/
import { expect, test } from "vitest";

/**
 * Given an integer array nums, return true if any value appears
 * at least twice in the array, and return false
 * if every element is distinct.
 * @param {number[]} nums
 * @return {boolean}
 *
 * #naive, #arrays
 */
var containsDuplicate = function (nums = []) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = (map[nums[i]] || 0) + 1;

    if (map[nums[i]] > 1) {
      return true;
    }
  }

  return false;
};

test("containsDuplicate", () => {
  expect(containsDuplicate([1, 2, 3, 1])).toEqual(true);
});
