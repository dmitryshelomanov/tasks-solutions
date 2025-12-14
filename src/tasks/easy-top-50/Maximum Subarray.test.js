// https://leetcode.com/explore/interview/card/top-interview-questions-easy/97/dynamic-programming/566/

/**
 * Найти подмассив с максимальной суммой
 *
 * Задача: Найти подмассив с наибольшей суммой и вернуть эту сумму.
 *
 * Паттерны: #arrays, #dynamic
 */

import { expect, test } from "vitest";
var maxSubArrayDynamic = function (nums) {
  let max = nums[0];
  let curr = nums[0];

  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    max = Math.max(max, curr);
  }

  return max;
};

test("maxSubArrayDynamic", () => {
  expect(maxSubArrayDynamic([-1, -2, -3, -4, -5])).toEqual(-1);
  expect(maxSubArrayDynamic([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6);
  expect(maxSubArrayDynamic([1])).toEqual(1);
  expect(maxSubArrayDynamic([5, 4, -1, 7, 8])).toEqual(23);
});
