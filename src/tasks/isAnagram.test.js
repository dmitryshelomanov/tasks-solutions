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
    }
  }

  const keys = map.keys();

  for (let key of keys) {
    if (map.get(key) !== 0) {
      return false;
    }
  }

  return true;
}

test("isAnagram", () => {
  expect(isAnagram("finder", "friend")).toBe(true);
  expect(isAnagram("hello", "buy")).toBe(false);
});
