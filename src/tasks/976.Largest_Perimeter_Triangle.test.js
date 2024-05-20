import { expect, test } from "vitest";

// https://leetcode.com/problems/largest-perimeter-triangle/description/

/**
 * @param {number[]} nums
 * @return {number}
 */
function largestPerimeter(nums) {
  nums.sort((a, b) => b - a);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i + 1] + nums[i + 2] > nums[i]) {
      return nums[i + 1] + nums[i + 2] + nums[i];
    }
  }

  return 0;
}

test("largest-perimeter", () => {
  // Input: nums = [2,1,2]
  // Output: 5
  // Explanation: You can form a triangle with three side lengths: 1, 2, and 2.
  expect(largestPerimeter([2, 1, 2])).toBe(5);
  // Input: nums = [1,2,1,10]
  // Output: 0
  // Explanation:
  // You cannot use the side lengths 1, 1, and 2 to form a triangle.
  // You cannot use the side lengths 1, 1, and 10 to form a triangle.
  // You cannot use the side lengths 1, 2, and 10 to form a triangle.
  // As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.
  expect(largestPerimeter([1, 2, 1, 10])).toBe(0);
  expect(largestPerimeter([3, 2, 3, 4])).toBe(10);
});
