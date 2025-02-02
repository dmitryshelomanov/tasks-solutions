import { expect, test } from "vitest";

function t(sum, limits) {
  if (sum % 100 !== 0) {
    return "incorrect";
  }

  const result = [];
  const notes = Object.keys(limits)
    .map(Number)
    .sort((a, b) => b - a);
  const availableSum = notes.reduce(
    (acc, note) => (sum >= note ? acc + limits[note] * note : acc),
    0
  );

  if (availableSum < sum) {
    return "no money enough";
  }

  while (notes.length > 0) {
    const note = notes.shift();

    const availableNoteCount = limits[note];
    const moneyNeeded = Math.floor(sum / note);
    const noteCount = Math.min(moneyNeeded, availableNoteCount);

    if (sum >= note && availableNoteCount > 0) {
      result.push(`${note}x${noteCount}`);
      limits[note] = limits[note] - noteCount;
      sum -= noteCount * note;
    }
  }

  return result.join(",");
}

test("ATM", () => {
  expect(t(5000, { 5000: 2 })).toBe("5000x1");
  expect(t(10000, { 5000: 2 })).toBe("5000x2");
  expect(t(20000, { 5000: 2, 500: 3, 1000: 4, 2000: 5 })).toBe("5000x2,2000x5");
  expect(t(20000, { 5000: 2 })).toBe("no money enough");
  expect(t(125, { 5000: 2 })).toBe("incorrect");
  expect(t(576, { 5000: 2 })).toBe("incorrect");
});

test("ATM - queue", () => {
  const limits = { 5000: 2, 500: 3, 1000: 4, 2000: 5 };

  const rs = [5000, 10000, 20000, 3679].map((sum) => t(sum, limits));

  expect(rs).toEqual([
    "5000x1",
    "5000x1,2000x2,1000x1",
    "no money enough",
    "incorrect",
  ]);
  expect(limits).toEqual({ 500: 3, 1000: 3, 2000: 3, 5000: 0 });
});
