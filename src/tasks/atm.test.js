import { expect, test } from "vitest";

function t(sum, limits) {
  const result = [];
  const notes = Object.keys(limits)
    .map(Number)
    .sort((a, b) => b - a);
  const avaliableSumm = notes.reduce(
    (acc, note) => (sum >= note ? acc + limits[note] * note : acc),
    0
  );

  if (avaliableSumm < sum) {
    return "no money enough";
  }

  while (notes.length > 0) {
    const note = notes.shift();

    const avaliableNoteCount = limits[note];
    const moneyNeeded = Math.floor(sum / note);
    const noteCount = Math.min(moneyNeeded, avaliableNoteCount);

    if (sum >= note && avaliableNoteCount > 0) {
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
});
