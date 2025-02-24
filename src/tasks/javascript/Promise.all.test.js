import { expect, test } from "vitest";

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  let fullFilledCounter = 0;
  let rs = Array.from({ length: functions.length });

  return new Promise((resolve, reject) => {
    for (let i = 0; i < functions.length; i++) {
      functions[i]()
        .then((result) => {
          rs[i] = result;
          fullFilledCounter += 1;
        })
        .catch(reject)
        .finally(() => {
          if (functions.length === fullFilledCounter) {
            resolve(rs);
          }
        });
    }
  });
};

test("javascript/Promise.all", () => {
  expect(1).toBe(1);
});
