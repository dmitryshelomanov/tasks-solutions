import { expect, test } from "vitest";

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  if (s.length === 1) {
    return false;
  }

  for (let i = 0; i < s.length / 2; i++) {
    if (s.length % (i + 1) !== 0) continue;

    const substr = s.slice(0, i + 1);

    if (s === substr.repeat(Math.ceil(s.length / substr.length))) {
      return true;
    }
  }

  return false;
};

test("repeatedSubstringPattern", () => {
  expect(repeatedSubstringPattern("abcderdabcde")).toBe(false);
  expect(repeatedSubstringPattern("abab")).toBe(true);
  expect(repeatedSubstringPattern("a")).toBe(false);
});
