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
 * Паттерны: #arrays, #two_pointers, #merge, #in_place
 * Сложность: O(m + n)
 * 
 * @param {number[]} nums1 - Первый отсортированный массив (длина m + n, первые m элементов значимы)
 * @param {number} m - Количество элементов в nums1
 * @param {number[]} nums2 - Второй отсортированный массив
 * @param {number} n - Количество элементов в nums2
 * @return {void} Не возвращает значение, модифицирует nums1 на месте
 */
var merge = function (nums1, m, nums2, n) {
  let left = m - 1;
  let right = n - 1;
  let index = m + n - 1;

  while (left >= 0 && right >= 0) {
    if (nums1[left] > nums2[right]) {
      nums1[index] = nums1[left];
      left--;
    } else {
      nums1[index] = nums2[right];
      right--;
    }
    index--;
  }

  while (right >= 0) {
    nums1[index] = nums2[right];
    right--;
    index--;
  }
};

