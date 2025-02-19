// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/887/

import { expect, test } from "vitest";

/**
 * @param {string[]} strs
 * @return {string}
 * 
 * Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".
#strings
 */
var longestCommonPrefix = function (strs) {
  const first = strs[0];
  let prefix = "";

  for (let i = 0; i < first.length; i++) {
    const everyHasPrefix = strs.every((s) => s[i] === first[i]);

    if (everyHasPrefix) {
      prefix += first[i];
    } else {
      return prefix;
    }
  }

  return prefix;
};

test("longestCommonPrefix", () => {
  expect(longestCommonPrefix(["dog", "tee", "tee"])).toEqual("");
  expect(longestCommonPrefix(["flower", "flow", "flight"])).toEqual("fl");
});
