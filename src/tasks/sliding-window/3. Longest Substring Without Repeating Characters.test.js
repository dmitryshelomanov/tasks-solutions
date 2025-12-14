/**
 * Найти длину самой длинной подстроки без повторяющихся символов
 *
 * Задача: Найти длину самой длинной подстроки без повторяющихся символов в строке.
 *
 * Паттерны: #strings, #sliding_window, #hashtable
 */

import { expect, test } from "vitest";
function uniqueSubstring(str) {
  let left = 0;
  let right = 0;
  let maxLen = 0;
  const map = new Map();

  while (right < str.length) {
    if (map.has(str[right])) {
      const nextLeft = map.get(str[right]) + 1;

      for (let i = left; i < nextLeft; i++) {
        map.delete(str[i]);
      }

      left = nextLeft;
    }

    map.set(str[right], right);

    maxLen = Math.max(maxLen, right - left + 1);
    right++;
  }

  return maxLen;
}

test("uniqueSubstring", () => {
  expect(uniqueSubstring("abcabcbb")).toEqual(3);
  expect(uniqueSubstring("abcdeagktuio")).toEqual(11);
  expect(uniqueSubstring("abccdef")).toEqual(4);
  expect(uniqueSubstring("aaaaaab")).toEqual(2);
  expect(uniqueSubstring("aaabbbbg")).toEqual(2);
  expect(uniqueSubstring("abcdefghj")).toEqual(9);
  expect(uniqueSubstring("abcdefgha")).toEqual(8);
  expect(uniqueSubstring("aaaabcd")).toEqual(4);
  expect(uniqueSubstring("aaaabbbb")).toEqual(2);
});
