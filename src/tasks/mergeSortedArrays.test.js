// https://leetcode.com/problems/merge-sorted-array/description/

import { expect, test } from "vitest";

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

