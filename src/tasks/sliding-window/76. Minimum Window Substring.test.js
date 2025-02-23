import { expect, test } from "vitest";

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 
 * Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.
 */
var minWindow = function (s, t) {
  if (t.length > s.length) {
    return ""; // Если длина t больше длины s, сразу возвращаем пустую строку
  }

  let left = 0;
  let map = new Map(); // Хранит количество каждого символа из t
  let requiredSize = 0; // Сколько уникальных символов нужно найти
  let formed = 0; // Сколько уникальных символов уже найдено
  let result = [-1, -1]; // Индексы минимального окна
  let minLength = Infinity; // Минимальная длина окна

  // Заполняем map для строки t
  for (const char of t) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  requiredSize = map.size; // Количество уникальных символов в t

  for (let right = 0; right < s.length; right++) {
    const currChar = s[right];

    // Если текущий символ из t, обновляем его счетчик
    if (map.has(currChar)) {
      map.set(currChar, map.get(currChar) - 1);
      if (map.get(currChar) === 0) {
        formed++; // Увеличиваем счетчик найденных уникальных символов
      }
    }

    // Попробуем сократить окно слева, пока оно все еще покрывает t
    while (formed === requiredSize) {
      const windowLength = right - left + 1;
      if (windowLength < minLength) {
        minLength = windowLength;
        result = [left, right];
      }

      // Передвигаем левый указатель
      const leftChar = s[left];
      if (map.has(leftChar)) {
        map.set(leftChar, map.get(leftChar) + 1);
        if (map.get(leftChar) > 0) {
          formed--; // Если символ стал недостаточным, уменьшаем formed
        }
      }
      left++;
    }
  }

  // Если результат не был обновлен, возвращаем пустую строку
  return result[0] === -1 ? "" : s.slice(result[0], result[1] + 1);
};

test("longest dynamic", () => {
  // Input: s = "ADOBECODEBANC", t = "ABC"
  // Output: "BANC"
  // Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
  expect(minWindow("ADOBECODEBANC", "ABC")).toBe("BANC");
  // Input: s = "a", t = "a"
  // Output: "a"
  // Explanation: The entire string s is the minimum window.
  // expect(minWindow("a", "a")).toBe("a");
  expect(minWindow("a", "b")).toBe("");
  // Input: s = "a", t = "aa"
  // Output: ""
  // Explanation: Both 'a's from t must be included in the window.
  // Since the largest window of s only has one 'a', return empty string.
  expect(minWindow("a", "aa")).toBe("");
});
