// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/559/

import { expect, test } from "vitest";

/**
 * @param {number[]} digits
 * @return {number[]}
 *
 *You are given a large integer represented as an integer array digits,
 * where each digits[i] is the ith digit of the integer.
 * The digits are ordered from most significant to least significant in left-to-right order.
 * The large integer does not contain any leading 0's.
 * Increment the large integer by one and return the resulting array of digits.
 *
 * #arrays
 */
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
