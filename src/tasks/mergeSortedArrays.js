/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
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

const arr = [4, 5, 6, 0, 0, 0];

merge(arr, 3, [1, 2, 3], 3);

console.log(arr);

/*

[1, 2, 3, 0, 0, 0] - [2, 5, 6]

[1, 2, 3, 0, 0, 6] - [2, 5, 6]

[1, 2, 3, 0, 5, 6] - [2, 5, 6]

[1, 2, 3, 3, 5, 6] - [2, 5, 6]

[1, 2, 2, 3, 5, 6] - [2, 5, 6]

*/
