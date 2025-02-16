import { expect, test } from "vitest";

// #two_pointers

const isLetter = (char) => {
  return /[a-zа-я0-9]/.test(char);
};

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    const firstChar = str[start].toLowerCase();
    const endChar = str[end].toLowerCase();

    if (!isLetter(firstChar)) {
      start += 1;
      continue;
    }

    if (!isLetter(endChar)) {
      end -= 1;
      continue;
    }

    if (firstChar !== endChar) {
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
  expect(isPalindrome("0P")).toBe(false);
  expect(isPalindrome("race a car")).toBe(false);
});
