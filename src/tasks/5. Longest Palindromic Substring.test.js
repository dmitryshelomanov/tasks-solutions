// https://leetcode.com/problems/longest-palindromic-substring/description/

/**
 * Найти самую длинную палиндромную подстроку
 *
 * Задача: Найти самую длинную подстроку-палиндром в строке s.
 *
 * Подход "расширение от центра":
 * Для каждой возможной позиции (как для нечётной, так и для чётной длины палиндрома)
 * расширяем границы влево и вправо, пока символы совпадают.
 * Отслеживаем самую длинную найденную подстроку.
 *
 * Паттерны: #strings, #two_pointers
 * Сложность: O(n^2) в худшем случае
 *
 * @param {string} s - Входная строка
 * @return {string} Самая длинная палиндромная подстрока
 */

import { expect, test } from "vitest";

var longestPalindrome = function (s) {
  if (s.length < 1) return "";
  if (s.length === 1) return s;

  let start = 0;
  let maxLen = 1;

  /**
   * Расширяет границы палиндрома от центра влево и вправо
   * @param {number} left - Левая граница
   * @param {number} right - Правая граница
   * @returns {number} Длина найденного палиндрома
   */
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }

  // Проверяем каждую возможную позицию как центр палиндрома
  for (let i = 0; i < s.length; i++) {
    // Проверяем палиндромы нечётной длины (центр в позиции i)
    // Например: "aba" - центр в 'b'
    const len1 = expandAroundCenter(i, i);

    // Проверяем палиндромы чётной длины (центр между i и i+1)
    // Например: "abba" - центр между двумя 'b'
    const len2 = expandAroundCenter(i, i + 1);

    // Выбираем максимальную длину из двух вариантов
    const len = Math.max(len1, len2);

    // Если нашли более длинный палиндром, обновляем start и maxLen
    if (len > maxLen) {
      maxLen = len;
      // Вычисляем начальную позицию палиндрома
      // Для нечётной длины: i - (len-1)/2, для чётной: i - (len-2)/2
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.slice(start, start + maxLen);
};

test("Longest Palindromic Substring", () => {
  expect(longestPalindrome("babad")).toBe("bab");
  expect(longestPalindrome("cbbd")).toBe("bb");
  expect(longestPalindrome("a")).toBe("a");
  expect(longestPalindrome("ac")).toBe("a");
});

test("Longest Palindromic Substring - один символ", () => {
  expect(longestPalindrome("a")).toBe("a");
});

test("Longest Palindromic Substring - вся строка палиндром", () => {
  expect(longestPalindrome("racecar")).toBe("racecar");
});
