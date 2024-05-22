import { expect, test } from "vitest";

/*
 Задача
 Просумировать число так что бы в итоге осталось одно значение
 123 -> 6
 123456 -> 21 -> 3
*/

function t(num) {
  while (num >= 10) {
    let temp = num;
    let sum = 0;

    while (temp > 0) {
      sum += temp % 10;
      temp = Math.floor(temp / 10);
    }

    num = sum;
  }

  return num;
}

test("sum of numbers", () => {
  expect(t(184562)).toBe(8);
  expect(t(3)).toBe(3);
  expect(t(10)).toBe(1);
  expect(t(11)).toBe(2);
});
