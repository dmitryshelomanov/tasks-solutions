// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/885/

import { expect, test } from "vitest";

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * #strings, #two_pointers, #sliding_window
Given two strings needle and haystack,
return the index of the first occurrence of needle in haystack,
or -1 if needle is not part of haystack.

Approach
Use two pointers: start for haystack and end for needle.
Slide the window: On mismatch, adjust start to the
next position after the first matched character, and reset end.
Return match index: When end reaches the end of needle, a full match is found.
 */

var strStr = function (haystack, needle) {
  if (needle.length === 0) return 0; // Edge case: empty needle

  let start = 0;
  let end = 0;

  while (start < haystack.length) {
    // If characters match, increment both pointers
    if (haystack[start] === needle[end]) {
      start++;
      end++;

      // If we have matched all characters in needle, return the start index of the match
      if (end === needle.length) {
        return start - end; // The start index of the match
      }
    } else {
      // Reset end to 0 for needle and move start back to the next position after the first matched character
      start = start - end + 1;
      end = 0;
    }
  }

  return -1; // No match found
};

test("strStr", () => {
  expect(strStr("---sad-butsad", "sad")).toEqual(3);
  expect(strStr("x", "x")).toEqual(0);
  expect(strStr("vscode", "code")).toEqual(2);
  expect(strStr("teststring", "sad")).toEqual(-1);
  expect(strStr("leetcode", "leeto")).toEqual(-1);
});

// v s c o d e
// r=0,l=0
// r++, l++ -> не нашли совпадение
// r++ -> нашли c по l, далее увеличиваем окно
