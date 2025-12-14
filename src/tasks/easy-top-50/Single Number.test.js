// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/549/

/**
 * Найти единственное число, которое встречается один раз
 *
 * Задача: В непустом массиве каждое число встречается дважды, кроме одного. Найти это единственное число.
 *
 * Паттерны: #arrays, #hashtable
 */

import { expect, test } from "vitest";
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
