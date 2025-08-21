import { expect, test } from "vitest";

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeI = function (nums, k) {
  let min = Math.min(...nums);
  let max = Math.max(...nums);

  if (max - k <= min + k) {
    return 0;
  }

  return max - k - (min + k);
};

test("shortestToChar", () => {
  // Input: nums = [1], k = 0
  // Output: 0
  // Explanation: The score is max(nums) - min(nums) = 1 - 1 = 0.

  expect(smallestRangeI([1], 0)).toBe(0);

  // Input: nums = [0,10], k = 2
  // Output: 6
  // Explanation: Change nums to be [2, 8]. The score is max(nums) - min(nums) = 8 - 2 = 6.

  expect(smallestRangeI([0, 10], 2)).toBe(6);

  // Input: nums = [1,3,6], k = 3
  // Output: 0
  // Explanation: Change nums to be [4, 4, 4]. The score is max(nums) - min(nums) = 4 - 4 = 0.

  expect(smallestRangeI([1, 3, 6], 3)).toBe(0);
  expect(smallestRangeI([2, 7, 2], 1)).toBe(3);
});
