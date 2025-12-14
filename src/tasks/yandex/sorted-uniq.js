const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;
let count = 0;
let prev = null;

rl.on("line", (line) => {
  if (count === 0) {
    n = parseInt(line, 10);
  } else {
    const num = parseInt(line, 10);

    if (prev === null || num !== prev) {
      console.log(num);
      prev = num;
    }
  }

  count++;

  if (count === n + 1) {
    rl.close();
  }
});
