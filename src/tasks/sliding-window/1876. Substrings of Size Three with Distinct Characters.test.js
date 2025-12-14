// https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/

/**
 * Подсчитать количество "хороших" подстрок длины 3
 *
 * Задача: Подсчитать количество подстрок длины 3 без повторяющихся символов.
 * Подстрока считается "хорошей", если все её символы различны.
 *
 * Паттерны: #strings, #sliding_window
 */

import { expect, test } from "vitest";
var countGoodSubstrings = function (s) {
  let count = 0;
  let left = 0;
  let right = 0;
  const set = new Set();

  while (right < s.length) {
    set.add(s[right]);

    if (right + 1 - left === 3) {
      left++;
      right = left;

      if (set.size === 3) {
        count++;
      }

      set.clear();
      continue;
    }

    right++;
  }

  return count;
};

test("countGoodSubstrings", () => {
  // Explanation: There are 4 substrings of size 3: "xyz", "yzz", "zza", and "zaz".
  // The only good substring of length 3 is "xyz".
  expect(countGoodSubstrings("xyzzaz")).toBe(1);

  // Input: s = "aababcabc"
  // Explanation: There are 7 substrings of size 3: "aab", "aba", "bab", "abc", "bca", "cab", and "abc".
  // The good substrings are "abc", "bca", "cab", and "abc".
  expect(countGoodSubstrings("aababcabc")).toBe(4);
});
