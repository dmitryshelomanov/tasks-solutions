import { expect, test } from "vitest";

function findSequence(sequence, target) {
  if (target.length < sequence.length) {
    return -1;
  }

  for (let i = 0; i < target.length - (sequence.length - 1); i++) {
    let check = 0;

    for (let j = 0; j < sequence.length; j++) {
      if (sequence[j] !== target[i + j]) {
        break;
      }

      if (sequence[j] === target[i + j]) {
        check += 1;
      }
    }

    if (check === sequence.length) {
      return i;
    }
  }

  return -1;
}

test("findSequence", () => {
  expect(findSequence([1, 2, 3], ["o", "t", 1, 200, 300])).toEqual(-1);
  expect(findSequence([1, 2, 3], ["o", "t", 1, 2, 3, 5, 6])).toEqual(2);
  expect(findSequence([1, 2, 3], ["o", "t", 1, 2, 5, 6])).toEqual(-1);
  expect(findSequence([1, 2, 3], ["o", "t", 1, 2, 3])).toEqual(2);
  expect(findSequence([1, 2, 3], [1, 2, 3])).toEqual(0);
  expect(findSequence([1, 2, 3], [1, 99, 3])).toEqual(-1);
  expect(findSequence([1, 2, 3], [1, 2, 1, 2, 3])).toEqual(2);

  expect(findSequence([1, 2], [1, 2])).toEqual(0);
  expect(findSequence([1, 2], [0, 0, 0, 0, 0, 1, 2])).toEqual(5);

  expect(findSequence([1, 2, 3, 4], [1, 2])).toEqual(-1);

  expect(findSequence([4], [1, 2, 3, 4])).toEqual(3);

  expect(findSequence([1], [1])).toEqual(0);
});
