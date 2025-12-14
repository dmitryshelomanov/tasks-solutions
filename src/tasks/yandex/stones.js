/**
 * Подсчитать количество драгоценных камней
 *
 * Задача: Даны две строки - jewels (типы драгоценных камней) и stones (камни, которые у нас есть).
 * Нужно подсчитать, сколько камней из stones являются драгоценными (есть в jewels).
 *
 * Подход:
 * Проходим по каждому символу строки stones и проверяем, содержится ли он в строке jewels.
 * Используем метод includes() для проверки наличия символа.
 *
 * Паттерны: #strings, #naive
 * Сложность: O(n * m), где n - длина stones, m - длина jewels
 *
 * Оптимизация: Можно использовать Set для O(1) проверки, что даст O(n + m)
 */
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let lines = [];

// Читаем все строки из потока ввода
rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const [jewels, stones] = lines;
  let result = 0;

  // Проходим по каждому символу в stones
  for (let i = 0; i < stones.length; i++) {
    // Проверяем, является ли камень драгоценным
    if (jewels.includes(stones.charAt(i))) {
      ++result;
    }
  }

  process.stdout.write(result.toString());
});
