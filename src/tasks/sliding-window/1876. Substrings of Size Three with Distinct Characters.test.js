// https://leetcode.com/problems/substrings-of-size-three-with-distinct-characters/

import { expect, test } from "vitest";

/**
 * @param {string} s
 * @return {number}
 * 
 * A string is good if there are no repeated characters.
Given a string return the number of good substrings of length three i
Note that if there are multiple occurrences of the same substring, every occurrence should be counted.
A substring is a contiguous sequence of characters in a string.
 */
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
