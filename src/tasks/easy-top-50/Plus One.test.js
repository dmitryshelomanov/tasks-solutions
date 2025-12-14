// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/559/

/**
 * Увеличить большое число на единицу
 *
 * Задача: Дано большое число, представленное массивом цифр. Увеличить его на единицу и вернуть результат.
 *
 * Паттерны: #arrays
 */

import { expect, test } from "vitest";
var plusOne = function (digits) {
  return (BigInt(digits.join("")) + BigInt(1))
    .toString()
    .split("")
    .map((n) => Number(n));
};

test("plusOne", () => {
  expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
  expect(plusOne([9])).toEqual([1, 0]);
  expect(plusOne([9, 9, 9])).toEqual([1, 0, 0, 0]);
  expect(plusOne([1])).toEqual([2]);
  expect(plusOne([1, 9, 9])).toEqual([2, 0, 0]);
});
