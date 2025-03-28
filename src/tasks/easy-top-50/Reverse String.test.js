// https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/879/
import { expect, test } from "vitest";

/**
 * #strings, #in_place
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 * 
 * Write a function that reverses a string. The input string is given as an array of characters s.
You must do this by modifying the input array in-place with O(1) extra memory.
 */
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};

const isVowel = (char) => /[aeiouAEIOU]/.test(char);

var reverseVowels = function (s) {
  let left = 0;
  let right = s.length - 1;

  s = s.split("");

  while (left < right) {
    const leftChar = s[left];
    const rightChar = s[right];

    if (!isVowel(leftChar)) {
      left += 1;
      continue;
    } else if (!isVowel(rightChar)) {
      right -= 1;
    } else {
      [s[left], s[right]] = [s[right], s[left]];
      right--;
      left++;
    }
  }

  return s.join("");
};

test("reverseString", () => {
  const str1 = ["h", "e", "l", "l", "o"];
  expect((reverseString(str1), str1)).toEqual(["o", "l", "l", "e", "h"]);

  const str2 = ["H", "a", "n", "n", "a", "h"];
  expect((reverseString(str2), str2)).toEqual(["h", "a", "n", "n", "a", "H"]);

  expect(reverseVowels("leetcode")).toEqual("leotcede");
});
