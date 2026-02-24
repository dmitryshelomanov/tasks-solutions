/**
 * Проверить, являются ли строки анаграммами
 *
 * Задача: Проверить, являются ли две строки анаграммами друг друга
 * (содержат одинаковые символы в одинаковом количестве).
 *
 * Паттерны: #strings, #hashtable
 */

import { expect, test } from "vitest";

function isAnagram(a = "", b = "") {
  if (a.length != b.length) {
    return false;
  }

  const map = new Map();

  for (let i = 0; i < a.length; i++) {
    map.set(a[i], (map.get(a[i]) || 0) + 1);
  }

  for (let i = 0; i < b.length; i++) {
    if (map.has(b[i])) {
      map.set(b[i], map.get(b[i]) - 1);

      if (map.get(b[i]) === 0) {
        map.delete(b[i]);
      }
    }
  }

  return map.size === 0;
}

test("isAnagram", () => {
  expect(isAnagram("finder", "friend")).toBe(true);
  expect(isAnagram("finder", "friedn")).toBe(true);
  expect(isAnagram("hello", "buy")).toBe(false);
});
