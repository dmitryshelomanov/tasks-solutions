import { expect, test } from "vitest";

const brackets = {
  "[": "]",
  "{": "}",
  "(": ")",
  "<": ">",
};

const bracketsRevert = Object.keys(brackets).reduce(
  (acc, key) => ({ ...acc, [brackets[key]]: key }),
  {}
);

function t(str) {
  const bracketsStack = str.split("");
  const openedStack = [];

  while (bracketsStack.length > 0) {
    const bracket = bracketsStack.shift();

    if (brackets[bracket]) {
      openedStack.unshift(bracket);
      continue;
    }

    if (bracketsRevert[bracket] !== openedStack.shift()) {
      return false;
    }
  }

  return openedStack.length === 0;
}

test("Corretly braces", () => {
  expect(t("<>")).toBe(true);
  expect(t("<>]")).toBe(false);
  expect(t("[<]>")).toBe(false);
  expect(t("[<>]")).toBe(true);
  expect(t("[<>]()[]{}")).toBe(true);
  expect(t("[<>]({])")).toBe(false);
});
