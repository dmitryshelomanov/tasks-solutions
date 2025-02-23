// https://leetcode.com/problems/length-of-last-word/description/?envType=problem-list-v2&envId=string&
import { expect, test } from "vitest";

/**
 * @param {string} s
 * @return {number}
 * 
 * Given a string s consisting of words and spaces, return the length of the last word in the string.
A word is a maximal 
substring
 consisting of non-space characters only.

 #string
 */
var lengthOfLastWord = function (s) {
  let count = 0;
  let i = s.length - 1;

  while (i >= 0 && s[i] === " ") {
    i--;
  }

  while (i >= 0 && s[i] !== " ") {
    count++;
    i--;
  }

  return count;
};

test("lengthOfLastWord", () => {
  expect(lengthOfLastWord("a b c d")).toEqual(1);
  expect(lengthOfLastWord("Hello World")).toEqual(5);
  expect(lengthOfLastWord("a b c dd")).toEqual(2);
  expect(lengthOfLastWord("   a b c dd     ")).toEqual(2);
  expect(lengthOfLastWord("hhhhh   hh")).toEqual(2);
  expect(lengthOfLastWord("hhhhh hh ")).toEqual(2);
});
