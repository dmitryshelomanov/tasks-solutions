import { expect, test } from "vitest";

// Дана строка-выражение вида:
// *1+38+37943*. При этом:
// скобок нет
// унарных минусов нет
// вычитания и деления нет
// только сложение и умножение
// сложность конечно в том что умножения приоритетнее сложений
// Написать Функцию, вычисляющую выражение:
// Ограничения: O(1) по памяти, O(N) по премани
// Тест-кейсы:
// "1"
// "1+2"
// "23"
// "1+23+5™
// "12+35"

function t(str) {
  let sum = 0;
  let currentNum = 0;
  let multiply = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "+") {
      sum += currentNum * multiply;
      currentNum = 0;
      multiply = 1;
    } else if (str[i] === "*") {
      multiply = currentNum;
      currentNum = 0;
    } else {
      currentNum = +str[i];
    }
  }

  return sum + currentNum * multiply;
}

test("string-calculator", () => {
  expect(t("2+2+2*3")).toBe(10);
  expect(t("2+2*2+2*3")).toBe(12);
  expect(t("0*2+2+2*0")).toBe(2);
});
