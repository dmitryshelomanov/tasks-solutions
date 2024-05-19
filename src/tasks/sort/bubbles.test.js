import { expect, test } from "vitest";

function t() {
  const data = [1, 4, 5, 7, 3, 9, 8];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - 1 - i; j++) {
      if (data[j] > data[j + 1]) {
        const tmp = data[j];

        data[j] = data[j + 1];
        data[j + 1] = tmp;
      }
    }
  }

  return data;
}

test("sort:bables", () => {
  expect(t()).toEqual([1, 3, 4, 5, 7, 8, 9]);
});
