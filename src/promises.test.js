import { act } from "react";
import { expect, test } from "vitest";

function PromiseAny(promises = []) {
  let failureCounter = 0;
  const errors = Array.from({ length: promises.length });

  return new Promise((rs, rj) => {
    promises.forEach((promise, index) => {
      promise.then(rs).catch((error) => {
        errors[index] = error;
        failureCounter += 1;

        if (failureCounter >= promises.length) {
          rj(errors);
        }
      });
    });
  });
}

function testRequest({ fulfilled = true, t = 10, value }) {
  return new Promise((rs, rj) => {
    setTimeout(() => {
      fulfilled ? rs(value) : rj(value);
    }, t);
  });
}

Object.defineProperty(Promise, "any", {
  value: PromiseAny,
});

test("PromiseAny", async () => {
  expect(
    await act(() =>
      Promise.any([
        testRequest({ t: 10, value: 1 }),
        testRequest({ t: 0, value: 2 }),
        testRequest({ t: 30, value: 3 }),
      ])
    )
  ).toBe(2);

  expect(
    await act(() =>
      Promise.any([
        testRequest({ t: 100, value: 1 }),
        testRequest({ t: 30, value: 3, fulfilled: false }),
      ])
    )
  ).toBe(1);

  expect(
    await act(() => Promise.any([testRequest({ t: 100, value: 1 })]))
  ).toBe(1);

  try {
    await act(() =>
      Promise.any([
        testRequest({ t: 10, value: 1, fulfilled: false }),
        testRequest({ t: 0, value: 2, fulfilled: false }),
        testRequest({ t: 30, value: 3, fulfilled: false }),
      ])
    );
  } catch (e) {
    expect(e).toEqual([1, 2, 3]);
  }
});
