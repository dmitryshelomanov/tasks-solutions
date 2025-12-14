// https://leetcode.com/problems/longest-palindromic-substring/description/

import { expect, test } from "vitest";

var longestPalindrome = function (s) {
  if (s.length < 1) return "";
  if (s.length === 1) return s;

  let start = 0;
  let maxLen = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(i, i);
    const len2 = expandAroundCenter(i, i + 1);
    const len = Math.max(len1, len2);
    
    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.slice(start, start + maxLen);
};

test("Longest Palindromic Substring", () => {
  expect(longestPalindrome("babad")).toBe("bab");
  expect(longestPalindrome("cbbd")).toBe("bb");
  expect(longestPalindrome("a")).toBe("a");
  expect(longestPalindrome("ac")).toBe("a");
});

test("Longest Palindromic Substring - один символ", () => {
  expect(longestPalindrome("a")).toBe("a");
});

test("Longest Palindromic Substring - вся строка палиндром", () => {
  expect(longestPalindrome("racecar")).toBe("racecar");
});

