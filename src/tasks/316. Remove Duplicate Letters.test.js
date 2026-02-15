// https://leetcode.com/problems/remove-duplicate-letters/description/

/**
 * Удалить дубликаты букв, сохраняя лексикографически наименьший порядок
 *
 * Задача: Удалить дубликаты букв из строки так, чтобы каждая буква встречалась только один раз,
 * и результат был лексикографически наименьшим среди всех возможных результатов.
 *
 * Подход:
 * Используется жадный алгоритм со стеком:
 * - Запоминаем последний индекс каждой буквы в строке
 * - Используем стек для построения результата
 * - Используем Set для отслеживания букв, уже добавленных в результат
 * - Если текущая буква меньше последней в стеке и последняя буква еще встретится позже,
 *   удаляем её из стека (чтобы получить лексикографически меньший результат)
 *
 * Паттерны: #stack, #hashtable, #strings, #greedy
 * Сложность: O(n)
 *
 * @param {string} s - Входная строка
 * @return {string} Строка без дубликатов в лексикографически наименьшем порядке
 */

import { expect, test } from "vitest";

function removeDuplicateLetters(s) {
  const stack = [];
  const seen = new Set();
  const lastOccurrence = {};

  // Запоминаем последний индекс каждой буквы
  for (let i = 0; i < s.length; i++) {
    lastOccurrence[s[i]] = i;
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Если буква уже в стеке - пропускаем
    if (seen.has(char)) continue;

    // Удаляем буквы из стека, если:
    // 1. Текущая буква меньше последней в стеке (лексикографически)
    // 2. Последняя буква еще встретится позже (можно будет добавить её позже)
    while (
      stack.length > 0 &&
      char < stack[stack.length - 1] &&
      i < lastOccurrence[stack[stack.length - 1]]
    ) {
      seen.delete(stack.pop());
    }

    // Добавляем текущую букву
    stack.push(char);
    seen.add(char);
  }

  return stack.join("");
}

test("removeDuplicateLetters", () => {
  expect(removeDuplicateLetters("bcabc")).toBe("abc");
  expect(removeDuplicateLetters("cbacdcbc")).toBe("acdb");
  expect(removeDuplicateLetters("abacb")).toBe("abc");
});

test("removeDuplicateLetters - edge cases", () => {
  // Одна буква
  expect(removeDuplicateLetters("a")).toBe("a");

  // Все буквы одинаковые
  expect(removeDuplicateLetters("aaaa")).toBe("a");

  // Уже отсортированные буквы
  expect(removeDuplicateLetters("abc")).toBe("abc");

  // Обратный порядок
  expect(removeDuplicateLetters("cba")).toBe("abc");

  // Сложный случай
  expect(removeDuplicateLetters("bbcaac")).toBe("bac");
});
