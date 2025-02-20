// https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word/description/?envType=problem-list-v2&envId=string&

import { expect, test } from "vitest";

/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 * 
Given an array of strings patterns and a string word, return the number of strings in patterns that exist as a substring in word.
A substring is a contiguous sequence of characters within a string.
#strings, #easy
 */
var numOfStrings = function (patterns, word) {
  let count = 0;

  for (let pattern of patterns) {
    if (word.indexOf(pattern) !== -1) {
      count += 1;
    }
  }

  return count;
};

test("longestCommonPrefix", () => {
  expect(numOfStrings(["a", "abc", "bc", "d"], "abc")).toEqual(3);
  expect(numOfStrings(["a", "b", "c"], "aaaaabbbbb")).toEqual(2);
});
