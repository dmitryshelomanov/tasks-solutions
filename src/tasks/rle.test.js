import { expect, test } from "vitest";

function t(str) {
  const acc = { counter: 0, rs: "" };

  for (let i = 0; i < str.length; i++) {
    const nextChar = str[i + 1];

    acc.counter += 1;

    if (nextChar !== str[i]) {
      acc.rs += acc.counter > 1 ? `${str[i]}${acc.counter}` : str[i];
      acc.counter = 0;
    }
  }

  return acc.rs;
}

test("Get prime number", () => {
  expect(t("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB")).toEqual(
    "A4B3C2XYZD4E3F3A6B28"
  );
});
