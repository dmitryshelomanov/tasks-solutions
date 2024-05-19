import { expect, test } from "vitest";

function t(str) {
  const { rs } = str.split("").reduce(
    (acc, char, index) => {
      const nextChar = str[index + 1];

      acc.counter += 1;

      if (nextChar !== char) {
        acc.rs += acc.counter > 1 ? `${char}${acc.counter}` : char;
        acc.counter = 0;
      }

      return acc;
    },
    { counter: 0, rs: "" }
  );

  return rs;
}

test("Get prime number", () => {
  expect(t("AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBB")).toEqual(
    "A4B3C2XYZD4E3F3A6B28"
  );
});
