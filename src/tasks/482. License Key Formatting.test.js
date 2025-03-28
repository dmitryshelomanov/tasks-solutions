import { expect, test } from "vitest";

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
  let license = "";
  let charIndex = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const char = s[i];

    if (char !== "-") {
      if (charIndex > 0 && charIndex % k === 0) {
        license = "-" + license;
      }

      license = char.toUpperCase() + license;
      charIndex++;
    }
  }

  return license;
};

test("licenseKeyFormatting", () => {
  // Example 1:

  // Input: s = "5F3Z-2e-9-w", k = 4
  // Output: "5F3Z-2E9W"
  // Explanation: The string s has been split into two parts, each part has 4 characters.
  // Note that the two extra dashes are not needed and can be removed.
  // Example 2:

  expect(licenseKeyFormatting("5F3Z-2e-9-w", 4)).toBe("5F3Z-2E9W");

  // Input: s = "2-5g-3-J", k = 2
  // Output: "2-5G-3J"
  // Explanation: The string s has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.

  expect(licenseKeyFormatting("2-5g-3-J", 2)).toBe("2-5G-3J");
});
