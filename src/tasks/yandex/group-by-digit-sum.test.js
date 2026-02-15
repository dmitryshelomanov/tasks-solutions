import { expect, test } from "vitest";

/**
 * Группировка чисел по сумме цифр (игнорируя нули)
 *
 * Задача: Сгруппировать числа из массива по сумме их цифр, игнорируя нули при вычислении суммы.
 * Числа с одинаковой суммой цифр должны быть в одной группе.
 *
 * Подход:
 * 1. Для каждого числа вычисляем сумму его цифр, игнорируя нули
 * 2. Используем Map для группировки: ключ - сумма цифр, значение - массив чисел
 * 3. Проходим по исходному массиву и добавляем числа в соответствующие группы
 * 4. Возвращаем массив всех групп
 *
 * Примеры:
 * - 123 → сумма цифр (1+2+3) = 6
 * - 321 → сумма цифр (3+2+1) = 6 → в одной группе с 123
 * - 102 → сумма цифр (1+2, игнорируя 0) = 3
 * - 21 → сумма цифр (2+1) = 3 → в одной группе с 102
 * - 100 → сумма цифр (1, игнорируя нули) = 1
 * - 1 → сумма цифр = 1 → в одной группе с 100
 *
 * Паттерны: #arrays, #hashtable
 * Сложность: O(n * k), где n - количество чисел, k - среднее количество цифр в числе
 *
 * @param {number[]} arr - Массив чисел для группировки
 * @returns {number[][]} Массив групп чисел, сгруппированных по сумме цифр
 */
function nums(arr) {
  /**
   * Вычисляет сумму цифр числа, игнорируя нули
   * @param {number} num - Число
   * @returns {number} Сумма ненулевых цифр
   */
  function getDigitSum(num) {
    return String(num)
      .split("")
      .map(Number)
      .filter((d) => d !== 0)
      .reduce((sum, d) => sum + d, 0);
  }

  // Map для хранения групп: ключ - сумма цифр, значение - массив чисел
  const groups = new Map();

  // Проходим по всем числам и группируем их
  for (const num of arr) {
    const digitSum = getDigitSum(num);

    // Если группы с такой суммой еще нет, создаем её
    if (!groups.has(digitSum)) {
      groups.set(digitSum, []);
    }

    // Добавляем число в соответствующую группу
    groups.get(digitSum).push(num);
  }

  // Возвращаем массив всех групп
  return Array.from(groups.values());
}

test("group by digit sum", () => {
  const result = nums([123, 321, 456, 654, 102, 21, 789, 987, 100, 1]);

  // Проверяем, что все числа присутствуют в результате
  const flattened = result.flat();
  expect(flattened).toHaveLength(10);
  expect(flattened.sort((a, b) => a - b)).toEqual([
    1, 21, 100, 102, 123, 321, 456, 654, 789, 987,
  ]);

  // Проверяем конкретные группы
  // Группа с суммой 6: [123, 321]
  const group6 = result.find((group) => group.includes(123));
  expect(group6).toContain(123);
  expect(group6).toContain(321);
  expect(group6).toHaveLength(2);

  // Группа с суммой 15: [456, 654]
  const group15 = result.find((group) => group.includes(456));
  expect(group15).toContain(456);
  expect(group15).toContain(654);
  expect(group15).toHaveLength(2);

  // Группа с суммой 3: [102, 21]
  const group3 = result.find((group) => group.includes(102));
  expect(group3).toContain(102);
  expect(group3).toContain(21);
  expect(group3).toHaveLength(2);

  // Группа с суммой 24: [789, 987]
  const group24 = result.find((group) => group.includes(789));
  expect(group24).toContain(789);
  expect(group24).toContain(987);
  expect(group24).toHaveLength(2);

  // Группа с суммой 1: [100, 1]
  const group1 = result.find((group) => group.includes(100));
  expect(group1).toContain(100);
  expect(group1).toContain(1);
  expect(group1).toHaveLength(2);
});

test("group by digit sum - edge cases", () => {
  // Пустой массив
  expect(nums([])).toEqual([]);

  // Одно число
  expect(nums([5])).toEqual([[5]]);

  // Числа с нулями
  expect(nums([100, 10, 1])).toEqual([[100, 10, 1]]); // все имеют сумму 1

  // Все числа в одной группе
  expect(nums([123, 321, 132, 213])).toEqual([[123, 321, 132, 213]]); // все имеют сумму 6

  // Каждое число в своей группе
  expect(nums([1, 2, 3, 4])).toHaveLength(4);
});
