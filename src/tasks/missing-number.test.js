/**
 * Найти пропущенное число
 *
 * Задача: В массиве из n чисел от 0 до n отсутствует одно число. Найти это число.
 *
 * Паттерны: #arrays
 */

import { expect, test } from "vitest";
function t(nums) {
  const len = nums.length;
  let total = (len * (len + 1)) / 2; // арифметическая прогрессия

  for (const num of nums) {
    total -= num;
  }

  return total;
}

test("Missing Number", () => {
  expect(t([3, 0, 1])).toEqual(2);
  expect(t([0, 1])).toEqual(2);
  expect(t([9, 6, 4, 2, 3, 5, 7, 0, 1])).toEqual(8);
  expect(t([0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12])).toEqual(6);
});
