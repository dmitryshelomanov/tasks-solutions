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

test("Correctly braces", () => {
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
