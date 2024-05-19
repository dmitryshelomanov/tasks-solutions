import { expect, test } from "vitest";

function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0 && num !== 2) {
      return false;
    }
  }

  return true;
}

function t(n) {
  const primes = [];

  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  return primes;
}

test("Get prime number", () => {
  expect(t(10)).toEqual([2, 3, 5, 7]);
});
