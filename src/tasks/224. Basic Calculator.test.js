// https://leetcode.com/problems/basic-calculator/description/

/**
 * Вычислить арифметическое выражение со скобками
 *
 * Задача: Вычислить результат арифметического выражения, содержащего только
 * операторы '+', '-', скобки '(', ')' и неотрицательные целые числа.
 * Строка может содержать пробелы, которые нужно игнорировать.
 *
 * Подход: Используем стек для обработки скобок. При встрече открывающей скобки
 * сохраняем текущий результат и знак перед скобкой. При закрывающей скобке
 * восстанавливаем предыдущее состояние. Для обработки чисел собираем их посимвольно.
 *
 * Алгоритм:
 * 1. Проходим по строке символ за символом
 * 2. Если встречаем цифру - собираем полное число
 * 3. Если встречаем '+' или '-' - добавляем предыдущее число к результату с учетом знака
 * 4. Если встречаем '(' - сохраняем текущий результат и знак в стек, сбрасываем состояние
 * 5. Если встречаем ')' - завершаем выражение в скобках, восстанавливаем состояние из стека
 *
 * Паттерны: #strings, #stack
 * Сложность: O(n) по времени, O(n) по памяти (где n - длина строки)
 *
 * @param {string} s - Арифметическое выражение
 * @return {number} Результат вычисления
 */

import { expect, test } from "vitest";

var calculate = function (s) {
  let result = 0;
  let num = 0;
  let sign = 1; // 1 for '+', -1 for '-'
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (/\d/.test(c)) {
      // Собираем полное число
      num = num * 10 + parseInt(c, 10);
    } else if (c === "+") {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (c === "-") {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (c === "(") {
      // Сохраняем текущий результат и знак перед скобкой
      stack.push(result);
      stack.push(sign);
      // Сбрасываем для вычисления внутри скобок
      result = 0;
      sign = 1;
      num = 0;
    } else if (c === ")") {
      // Завершаем выражение в скобках
      result += sign * num;
      // Восстанавливаем предыдущее состояние
      result *= stack.pop(); // prev sign
      result += stack.pop(); // prev result
      num = 0;
    }
  }

  // Добавляем последнее число
  result += sign * num;

  return result;
};

test("Basic Calculator - простые выражения", () => {
  expect(calculate("1 + 1")).toBe(2);
  expect(calculate(" 2-1 + 2 ")).toBe(3);
  expect(calculate("1")).toBe(1);
  expect(calculate("0")).toBe(0);
});

test("Basic Calculator - выражения со скобками", () => {
  expect(calculate("(1+(4+5+2)-3)+(6+8)")).toBe(23);
  expect(calculate("(1)")).toBe(1);
  expect(calculate("(1+2)")).toBe(3);
  expect(calculate("(1-2)")).toBe(-1);
});

test("Basic Calculator - вложенные скобки", () => {
  expect(calculate("1+(2+3)")).toBe(6);
  expect(calculate("1-(2+3)")).toBe(-4);
  expect(calculate("1-(2-3)")).toBe(2);
  expect(calculate("(1+(2+3))")).toBe(6);
});

test("Basic Calculator - отрицательные результаты в скобках", () => {
  expect(calculate("1-(2-3)")).toBe(2);
  expect(calculate("1-(2-3-4)")).toBe(6);
  expect(calculate("-(1+2)")).toBe(-3);
});

test("Basic Calculator - сложные выражения", () => {
  expect(calculate("2-1 + 2")).toBe(3);
  expect(calculate("1 + 2 - 3")).toBe(0);
  expect(calculate("10 + 20 - 30")).toBe(0);
  expect(calculate("100 + 200 - 300")).toBe(0);
});

test("Basic Calculator - выражения без пробелов", () => {
  expect(calculate("1+1")).toBe(2);
  expect(calculate("2-1+2")).toBe(3);
  expect(calculate("(1+2)")).toBe(3);
});

test("Basic Calculator - множественные скобки", () => {
  expect(calculate("(1+2)+(3+4)")).toBe(10);
  expect(calculate("(1+2)-(3+4)")).toBe(-4);
  expect(calculate("(1-2)-(3-4)")).toBe(0);
});
