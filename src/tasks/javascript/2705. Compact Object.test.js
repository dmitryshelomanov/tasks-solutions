// https://leetcode.com/problems/compact-object/description/?envType=study-plan-v2&envId=30-days-of-javascript
import { expect, test } from "vitest";

/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {
  if (obj === null) return null;
  if (Array.isArray(obj)) return obj.filter(Boolean).map(compactObject);
  if (typeof obj !== "object") return obj;

  const compacted = {};

  for (const key in obj) {
    const value = compactObject(obj[key]);

    if (value) {
      compacted[key] = value;
    }
  }

  return compacted;
};

test("javascript/flat", () => {
  expect(compactObject([null, 0, false, 1])).toEqual([1]);
  expect(compactObject({ a: null, b: [false, 1] })).toEqual({ b: [1] });
});
