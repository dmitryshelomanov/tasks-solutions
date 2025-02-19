// https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/564/
import { expect, test } from "vitest";

// You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

// On each day, you may decide to buy and/or sell the stock.
// You can only hold at most one share of the stock at any time.
// However, you can buy it then immediately sell it on the same day.

// Find and return the maximum profit you can achieve.

// #naive, #arrays
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices = []) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
};

// #dynamic, #arrays
/**
 * Разница в том что нужно выбрать именно 1 день на максимальную продажу
 * @param {number[]} prices
 * @return {number}
 */
var maxProfitOnlyOne = function (prices = []) {
  let left = 0; // Buy
  let right = 1; // sell
  let maxProfit = 0;

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
    } else {
      left = right;
    }
    right++;
  }

  return maxProfit;
};

// Как вариант с O^2
// var maxProfitOnlyOne = function (prices = []) {
//   let profit = 0;

//   for (let i = 0; i < prices.length; i++) {
//     for (let j = i + 1; j < prices.length; j++) {
//       profit = Math.max(prices[j] - prices[i], profit);
//     }
//   }

//   return profit;
// };

test("maxProfit", () => {
  expect(maxProfit([7, 6, 4, 3, 1])).toEqual(0);
  expect(maxProfit([1, 2, 3, 4, 5])).toEqual(4);
  expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(7);
});

test("maxProfitOnlyOne", () => {
  expect(maxProfitOnlyOne([7, 6, 4, 3, 1])).toEqual(0);
  expect(maxProfitOnlyOne([7, 1, 5, 3, 6, 4])).toEqual(5);
  expect(maxProfitOnlyOne([7, 1, 5, 1, 6, 4])).toEqual(5);
});
