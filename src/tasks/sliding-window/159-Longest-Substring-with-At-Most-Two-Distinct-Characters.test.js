/**
 * Найти самую длинную подстроку с не более чем двумя различными символами
 *
 * Задача: Найти длину самой длинной подстроки, содержащей не более двух различных символов.
 *
 * Паттерны: #strings, #sliding_window, #hashtable
 */

import { expect, test } from "vitest";
function longest(str) {
  let left = 0;
  let right = 0;
  let maxLen = 0;
  const map = new Map();

  while (right < str.length) {
    const currChar = str[right];

    map.set(currChar, map.get(currChar) + 1 || 1);

    while (map.size > 2) {
      const leftChar = str[left];

      map.set(leftChar, map.get(leftChar) - 1);

      if (map.get(leftChar) === 0) {
        map.delete(leftChar);
      }

      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
    right++;
  }

  return maxLen;
}

test("longest", () => {
  // Input: "eceba"
  // Output: 3
  // Explanation: t is "ece" which its length is 3.
  expect(longest("eceba")).toBe(3);
  // Input: "ccaabbb"
  // Output: 5
  // Explanation: t is "aabbb" which its length is 5.
  expect(longest("aabbb")).toBe(5);
  expect(longest("aaaaabbbbb")).toBe(10);
  expect(longest("a")).toBe(1);
  expect(longest("ab")).toBe(2);
  expect(longest("abc")).toBe(2);
  expect(longest("bcccccccccccccccc")).toBe(17);
  expect(longest("abcccccccccccccccc")).toBe(17);
});
