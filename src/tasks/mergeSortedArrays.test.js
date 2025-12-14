// https://leetcode.com/problems/merge-sorted-array/description/

/**
 * Объединить два отсортированных массива
 *
 * Задача: Объединить nums2 в nums1 как один отсортированный массив.
 * nums1 имеет длину m + n, где m - количество элементов nums1, а n - количество элементов nums2.
 * nums1 имеет размер, достаточный для размещения всех элементов из nums2.
 *
 * Подход:
 * Используется метод двух указателей, начиная с конца массивов.
 * Сравниваем элементы с конца и заполняем nums1 справа налево.
 * Это позволяет не использовать дополнительную память.
 *
 * Паттерны: #arrays, #two_pointers, #in_place
 * Сложность: O(m + n)
 *
 * @param {number[]} nums1 - Первый отсортированный массив (длина m + n, первые m элементов значимы)
 * @param {number} m - Количество элементов в nums1
 * @param {number[]} nums2 - Второй отсортированный массив
 * @param {number} n - Количество элементов в nums2
 * @return {void} Не возвращает значение, модифицирует nums1 на месте
 */

import { expect, test } from "vitest";

var merge = function (nums1, m, nums2, n) {
  // Указатели на последние значимые элементы в каждом массиве
  let left = m - 1; // Последний элемент в nums1
  let right = n - 1; // Последний элемент в nums2
  let index = m + n - 1; // Позиция для записи в nums1 (с конца)

  // Сравниваем элементы с конца и заполняем nums1 справа налево
  // Это позволяет не перезаписывать ещё не обработанные элементы
  while (left >= 0 && right >= 0) {
    if (nums1[left] > nums2[right]) {
      // Элемент из nums1 больше, записываем его
      nums1[index] = nums1[left];
      left--;
    } else {
      // Элемент из nums2 больше или равен, записываем его
      nums1[index] = nums2[right];
      right--;
    }
    index--;
  }

  // Если в nums2 остались элементы, копируем их
  // (элементы nums1 уже на своих местах)
  while (right >= 0) {
    nums1[index] = nums2[right];
    right--;
    index--;
  }
};

test("Merge Sorted Array", () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  const m = 3;
  const nums2 = [2, 5, 6];
  const n = 3;

  merge(nums1, m, nums2, n);
  expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
});

test("Merge Sorted Array - nums1 пустой", () => {
  const nums1 = [0];
  const m = 0;
  const nums2 = [1];
  const n = 1;

  merge(nums1, m, nums2, n);
  expect(nums1).toEqual([1]);
});

test("Merge Sorted Array - nums2 пустой", () => {
  const nums1 = [1];
  const m = 1;
  const nums2 = [];
  const n = 0;

  merge(nums1, m, nums2, n);
  expect(nums1).toEqual([1]);
});

test("Merge Sorted Array - все элементы из nums2 больше", () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  const m = 3;
  const nums2 = [4, 5, 6];
  const n = 3;

  merge(nums1, m, nums2, n);
  expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
});

test("Merge Sorted Array - все элементы из nums2 меньше", () => {
  const nums1 = [4, 5, 6, 0, 0, 0];
  const m = 3;
  const nums2 = [1, 2, 3];
  const n = 3;

  merge(nums1, m, nums2, n);
  expect(nums1).toEqual([1, 2, 3, 4, 5, 6]);
});
