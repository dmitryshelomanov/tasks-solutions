function seq(arr) {
  let maxLen = 0;
  let currLen = 0;

  for (let i of arr) {
    if (i === 1) {
      currLen++;
    } else {
      currLen = 0;
    }

    maxLen = Math.max(maxLen, currLen);
  }

  return maxLen;
}

console.log(seq([1, 0, 1, 0, 1]));
