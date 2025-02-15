// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/567/
import { expect, test } from "vitest";

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.

#arrays, #in_place, #two_pointers

 ↓
[0, 1, 0, 3, 12]
 ↑

    ↓
[1, 0, 0, 3, 12]
          ↑

    ↓
[1, 3, 0, 0, 12]
          ↑

       ↓
[1, 3, 0, 0, 12]
              ↑
 */
var moveZeroes = function (nums) {
  let left = 0;
  let right = 1;

  while (right < nums.length) {
    if (nums[left] !== 0) {
      left++;
    }

    if (nums[left] === 0) {
      nums[left] = nums[right];
      nums[right] = 0;
    }

    right++;
  }
};

test("moveZeroes", () => {
  const input = [0, 1, 0, 3, 12];
  expect((moveZeroes(input), input)).toEqual([1, 3, 12, 0, 0]);

  const input1 = [0];
  expect((moveZeroes(input1), input1)).toEqual([0]);

  const input2 = [0, 0, 0, 0];
  expect((moveZeroes(input2), input2)).toEqual([0, 0, 0, 0]);

  const input3 = [0, 0, 0, 1];
  expect((moveZeroes(input3), input3)).toEqual([1, 0, 0, 0]);

  const input4 = [1, 0, 0, 0];
  expect((moveZeroes(input4), input4)).toEqual([1, 0, 0, 0]);

  const input5 = [2, 1];
  expect((moveZeroes(input5), input5)).toEqual([2, 1]);
});
