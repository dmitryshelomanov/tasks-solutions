// https://leetcode.com/problems/3sum/description/

/**
 * Найти все уникальные тройки чисел, сумма которых равна нулю
 * 
 * Задача: Найти все уникальные тройки чисел в массиве nums, такие что nums[i] + nums[j] + nums[k] == 0.
 * Решение не должно содержать дублирующихся троек.
 * 
 * Подход (два указателя):
 * 1. Сначала сортируем массив — так проще искать, и можно пропускать повторы.
 * 2. Берём первое число (индекс i) — оно будет "якорем".
 *    - Если оно уже больше нуля — дальше всё будет положительным, сумма не будет нулём → выход.
 *    - Если оно такое же, как предыдущее — пропускаем, чтобы не дублировать тройки.
 * 3. Два других числа ищем двумя указателями:
 *    - left — сразу после i,
 *    - right — в конце массива.
 * 4. Считаем сумму:
 *    - 0? — нашли тройку! Добавляем в результат. Двигаем оба указателя, пропуская одинаковые числа.
 *    - Меньше 0? — нужно больше → двигаем left вправо.
 *    - Больше 0? — нужно меньше → двигаем right влево.
 * 
 * Паттерны: #arrays, #two_pointers, #sorting
 * Сложность: O(n^2)
 * 
 * @param {number[]} nums - Массив чисел
 * @return {number[][]} Массив уникальных троек, сумма которых равна нулю
 */
var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
};
