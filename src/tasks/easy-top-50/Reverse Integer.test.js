// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/880/
import { expect, test } from "vitest";

/**
 * @param {number} x
 * @return {number}
 * 
 * Given a signed 32-bit integer x, return x with its digits reversed.
 * If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
 */
var reverse = function (x) {
  const pow = 2 ** 31 - 1;
  let reversed = Math.abs(x).toString().split("").reverse().join("");
  if (reversed > pow) return 0;
  return Math.sign(x) * reversed;
};

// String to Integer (atoi)

var atoi = function (x) {
  const ans = Number.parseInt(x);
  const pow = 2 ** 31;

  if (ans) {
    if (ans <= -1 * pow) return -1 * pow;
    else if (ans >= pow - 1) return pow;
    else return ans;
  }

  return 0;
};

test("reverse", () => {
  expect(reverse(123)).toEqual(321);
  expect(reverse(120)).toEqual(21);
  expect(reverse(500)).toEqual(5);
  expect(reverse(509)).toEqual(905);
});

test("atoi", () => {
  expect(atoi("42")).toEqual(42);
  expect(atoi("042")).toEqual(42);
  expect(atoi("-042")).toEqual(-42);
});
