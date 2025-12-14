// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/881/

/**
 * Найти первый неповторяющийся символ
 *
 * Задача: Найти первый неповторяющийся символ в строке и вернуть его индекс. Если такого нет, вернуть -1.
 *
 * Паттерны: #strings, #hashtable
 */

import { expect, test } from "vitest";
var firstUniqChar = function (s) {
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
};

test("firstUniqChar", () => {
  expect(firstUniqChar("loveleetcode")).toEqual(2);
  expect(firstUniqChar("leetcode")).toEqual(0);
  expect(firstUniqChar("aabb")).toEqual(-1);
  expect(firstUniqChar("dddccdbba")).toEqual(8);
});
