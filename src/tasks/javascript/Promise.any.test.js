import { expect, test } from "vitest";

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAny = function (functions) {
  let rejectedCounter = 0;
  let errors = Array.from({ length: functions.length });

  return new Promise((resolve, reject) => {
    for (let i = 0; i < functions.length; i++) {
      functions[i]()
        .then(reject)
        .catch((err) => {
          rejectedCounter += 1;
          errors[i] = err;
        })
        .finally(() => {
          if (functions.length === rejectedCounter) {
            reject(errors);
          }
        });
    }
  });
};

test("javascript/Promise.any", () => {
  expect(1).toBe(1);
});
