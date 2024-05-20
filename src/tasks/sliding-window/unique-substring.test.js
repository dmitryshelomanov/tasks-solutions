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
    if (!map[str[right]]) {
      map[str[right]] = 0;
    }

    map[str[right]]++;

    if (map[str[right]] > 1) {
      map[str[left]]--;
      left += map[str[right]];
    }

    maxLen = Math.max(maxLen, right - left + 1);
    right++;
  }

  return maxLen;
}

test("uniqueSubstring", () => {
  expect(uniqueSubstring("aaaaaaab")).toEqual(2);
  expect(uniqueSubstring("abcabcbb")).toEqual(3);
  expect(uniqueSubstring("aaabbbbg")).toEqual(2);
  expect(uniqueSubstring("abcdefghj")).toEqual(9);
  expect(uniqueSubstring("abcdefgha")).toEqual(8);
  expect(uniqueSubstring("aaaabcd")).toEqual(4);
  expect(uniqueSubstring("aaaabbbb")).toEqual(2);
});
