// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/881/

import { expect, test } from "vitest";

/**
 * @param {string} s
 * @return {number}
 * #strings, #hashtable
 * Given a string s, find the first non-repeating character in
 * it and return its index. If it does not exist, return -1.
 */
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
