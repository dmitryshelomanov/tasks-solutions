import { expect, test } from "vitest";

function t(n) {
  const map = [0, 1];

  for (let i = 2; i < n; i++) {
    map[i] = map[i - 1] + map[i - 2];
  }

  return map[n - 1] + map[n - 2];
}

test("fibonacci", () => {
  expect(t(10)).toEqual(55);
  expect(t(100)).toEqual(354224848179262000000);
});
