import { expect, test } from "vitest";

// Задача , есть стек

// [10,20,30]

// На вход число 5 , нужно его вставить в стек так , что бы доставшее значение было меньше или равно

// Например стек pop = 30 , больше 5
// Значит pop до тех пор , пока не будет значение меньше или равно 5

// В примере такого нет , значит вставится в самое начало и ответ будет

// [5 ,10,20 ,30]

function t(stack, n) {
  const result = [];
  let gap = 1;
  let numberInPlace = false;

  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i] <= n && !numberInPlace) {
      result[i + gap] = n;
      numberInPlace = true;
      gap = 0;
    }

    result[i + gap] = stack[i];
  }

  if (!numberInPlace) {
    result[0] = n;
  }

  return result;
}

test("insert-in-stack", () => {
  expect(t([10, 20, 30], 5)).toEqual([5, 10, 20, 30]);
  expect(t([10, 20, 30, 40, 50], 35)).toEqual([10, 20, 30, 35, 40, 50]);
});
