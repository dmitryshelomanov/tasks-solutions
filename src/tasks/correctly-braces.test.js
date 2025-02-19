import { expect, test } from "vitest";

const brackets = {
  "[": "]",
  "{": "}",
  "(": ")",
  "<": ">",
};

function t(str) {
  const openedStack = [];

  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];

    if (brackets[bracket]) {
      openedStack.unshift(brackets[bracket]);
      continue;
    }

    if (bracket !== openedStack.shift()) {
      return false;
    }
  }

  return openedStack.length === 0;
}

test("Corretly braces", () => {
  expect(t("<>")).toBe(true);
  expect(t("][")).toBe(false);
  expect(t("[[")).toBe(false);
  expect(t("]]")).toBe(false);
  expect(t("<>]")).toBe(false);
  expect(t("[<]>")).toBe(false);
  expect(t("[<>]")).toBe(true);
  expect(t("[<>]()[]{}")).toBe(true);
  expect(t("[<>]({])")).toBe(false);
});

[3, 0, 1][(0, 3)];

// total = [0, 3] -> 0 + 1 + 2 + 3 = 5
// total = len+1 * (len+1 - 1) / 2 -> 4 * 3 / 2 = 6
// ДАлее total - currNun
// 6-3
// 3-0
// 3-1
// 2 -> число которого нету
