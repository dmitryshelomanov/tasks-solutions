// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/578/

/**
 * Проверить наличие дубликатов в массиве
 *
 * Задача: Вернуть true, если в массиве есть хотя бы одно значение, которое встречается дважды,
 * и false, если все элементы различны.
 *
 * Паттерны: #arrays, #hashtable
 */

import { expect, test } from "vitest";
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
