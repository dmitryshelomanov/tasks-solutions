import { expect, test } from "vitest";

function t(id) {
  const data = [
    {
      id: 0,
      name: "Все регионы",
    },
    {
      id: 67,
      name: "Алтайский край",
      chld: [
        {
          id: 32,
          name: "Алейск",
        },
        {
          id: 89,
          name: "Барнаул",
        },
      ],
    },
  ];

  const stack = [...data];

  while (stack.length > 0) {
    const region = stack.shift();

    if (region.id === id) {
      return region.name;
    }

    if (region.chld) {
      stack.unshift(...region.chld);
    }
  }
}

test("Graph: get region", () => {
  expect(t(89)).toEqual("Барнаул");
  expect(t(0)).toEqual("Все регионы");
  expect(t(67)).toEqual("Алтайский край");
});
