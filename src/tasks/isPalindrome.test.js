import { expect, test } from "vitest";

// #two_pointers

const isEqual = (str1 = "", str2 = "") => {
  return str1.toLowerCase() === str2.toLowerCase();
};

const isLetter = (char) => {
  return char.toLowerCase() !== char.toUpperCase();
};

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    const firstChar = str[start];
    const endChar = str[end];

    if (!isLetter(firstChar)) {
      start += 1;
      continue;
    }

    if (!isLetter(endChar)) {
      end -= 1;
      continue;
    }

    if (!isEqual(firstChar, endChar)) {
      return false;
    }

    start += 1;
    end -= 1;
  }

  return true;
}

test("isPalindrome", () => {
  expect(isPalindrome("Казак")).toBe(true);
  expect(isPalindrome(`Madam, I'm Adam`)).toBe(true);
  expect(isPalindrome("А в Енисее - синева")).toBe(true);
  expect(isPalindrome("О, духи, от уборки микробу-то и худо")).toBe(true);
  expect(isPalindrome("Не палиндром")).toBe(false);
});
