// https://leetcode.com/problems/minimum-moves-to-convert-string/description/?envType=problem-list-v2&envId=string&
import { expect, test } from "vitest";

/**
 * @param {string} s
 * @return {number}
 * #strings, #dynamic
 */
var minimumMoves = function (s) {
  let res = 0,
    i = 0,
    n = s.length;

  while (i < n) {
    // if find X, we can do max 3 change from "X" -> "O",
    // no matter it is "X" or "O" in i+1 and i+2, will count 1 operation
    if (s[i] == "X") {
      i += 3;
      res++;
    } else {
      i++;
    }
  }

  return res;
};

test("minimumMoves", () => {
  expect(minimumMoves("XXX")).toEqual(1);
  expect(minimumMoves("XX0X")).toEqual(2);
});
