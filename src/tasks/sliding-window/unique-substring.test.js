import { expect, test } from "vitest";

/*
Дана строка, найдите длину самой длинной подстроки без
повторяющихся символов.
abcabcbb
Выход: З Сответ "abc" - длина 3)|
*/
function uniqueSubstring(str) {
  let left = 0;
  let right = 0;
  let maxLen = 0;
  const map = {};

  while (right < str.length) {
    if (typeof map[str[right]] !== "undefined") {
      const nextLeft = map[str[right]] + 1;

      for (let i = left; i < nextLeft; i++) {
        map[str[i]] = undefined;
      }

      left = nextLeft;
    }

    map[str[right]] = right;

    maxLen = Math.max(maxLen, right - left + 1);
    right++;
  }

  return maxLen;
}

test("uniqueSubstring", () => {
  expect(uniqueSubstring("abcabcbb")).toEqual(3);
  expect(uniqueSubstring("abcdeagktuio")).toEqual(11);
  expect(uniqueSubstring("abccdef")).toEqual(4);
  expect(uniqueSubstring("aaaaaab")).toEqual(2);
  expect(uniqueSubstring("aaabbbbg")).toEqual(2);
  expect(uniqueSubstring("abcdefghj")).toEqual(9);
  expect(uniqueSubstring("abcdefgha")).toEqual(8);
  expect(uniqueSubstring("aaaabcd")).toEqual(4);
  expect(uniqueSubstring("aaaabbbb")).toEqual(2);
});
