import { expect, test } from "vitest";

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (acc, fn) =>
      (...args) =>
        acc(fn(...args))
  );
}

test("Compose works ", () => {
  const result = compose(
    (str) => str.split(""),
    (str) => str.toUpperCase()
  );

  expect(result("name")).toEqual(["N", "A", "M", "E"]);
});
