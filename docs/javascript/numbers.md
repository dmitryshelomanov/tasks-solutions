# Числа в JavaScript

## Введение

JavaScript предоставляет различные способы работы с числами, включая стандартные числа, большие числа через BigInt, и различные системы счисления.

---

## Бинарные числа

### Синтаксис

Синтаксис бинарных чисел использует ведущий ноль, за которым следует строчная или заглавная латинская буква "B" (`0b` или `0B`).

```javascript
const binary1 = 0b1010;  // 10 в десятичной системе
const binary2 = 0B1100;  // 12 в десятичной системе
```

**Важно**: Если цифры после `0b` не являются 0 или 1, возникает ошибка:
```
SyntaxError: Missing binary digits after 0b
```

### Преобразование в бинарную систему

```javascript
// Число в бинарную строку
(25).toString(2);        // '11001'
(42).toString(2);        // '101010'
Number(42).toString(2);  // '101010'
```

### Преобразование из бинарной системы

```javascript
// Бинарная строка в число
parseInt('11001', 2);    // 25
parseInt('101010', 2);   // 42

// Используя Number
Number('0b11001');       // 25
```

---

## BigInt

`BigInt` — это встроенный объект, который предоставляет способ представления целых чисел больше `2^53 - 1` (максимальное безопасное целое число в JavaScript).

### Создание BigInt

```javascript
// Способы создания BigInt
const big1 = BigInt(12345678901234567890);
const big2 = 12345678901234567890n;  // Литерал BigInt
const big3 = BigInt('12345678901234567890');
```

### Операции с BigInt

```javascript
const a = 9007199254740991n;
const b = 1n;

// Арифметические операции
console.log(a + b);  // 9007199254740992n
console.log(a - b);  // 9007199254740990n
console.log(a * b);  // 9007199254740991n
console.log(a / b);  // 9007199254740991n (деление усекается)

// Сравнение
console.log(a > b);  // true
console.log(a === 9007199254740991n);  // true
```

**Важно**: Нельзя смешивать BigInt и обычные числа в операциях:
```javascript
const big = 10n;
const num = 10;

// console.log(big + num);  // TypeError!
console.log(big + BigInt(num));  // 20n
console.log(Number(big) + num);  // 20
```

---

## Работа с бинарными числами и BigInt

### Сложение бинарных чисел

```javascript
// Способ 1: Преобразование через строки
const b1 = '11001';  // 25
const b2 = '11001';  // 25

const sum1 = parseInt(b1, 2) + parseInt(b2, 2);
console.log(sum1.toString(2));  // '110010' (50)

// Способ 2: Используя BigInt
const b3 = '0b11001';
const b4 = '0b11001';

const sum2 = BigInt(b3) + BigInt(b4);
console.log(sum2.toString(2));   // '110010'
console.log(sum2.toString(10));  // '50'
```

### Примеры операций

```javascript
// Преобразование числа в бинарную строку
(25).toString(2);  // '11001'

// Создание BigInt из бинарной строки
const big1 = BigInt('0b11001');  // 25n
const big2 = BigInt('0b11001');  // 25n

// Сложение
const sum = big1 + big2;  // 50n

// Преобразование обратно
sum.toString(2);   // '110010' (бинарная система)
sum.toString(10);  // '50' (десятичная система)
Number(sum);       // 50 (обычное число)
```

---

## Другие системы счисления

### Восьмеричная система (Octal)

```javascript
const octal1 = 0o755;      // 493
const octal2 = 0O644;      // 420
(493).toString(8);         // '755'
parseInt('755', 8);        // 493
```

### Шестнадцатеричная система (Hexadecimal)

```javascript
const hex1 = 0xFF;         // 255
const hex2 = 0xff;         // 255
(255).toString(16);        // 'ff'
parseInt('FF', 16);        // 255
```

### Преобразование между системами

```javascript
const num = 42;

num.toString(2);   // '101010' (бинарная)
num.toString(8);   // '52' (восьмеричная)
num.toString(10);  // '42' (десятичная)
num.toString(16);  // '2a' (шестнадцатеричная)
```

---

## Проблемы точности чисел

### Проблема с плавающей точкой

```javascript
console.log(0.1 + 0.2);  // 0.30000000000000004 (неточность!)
console.log(0.1 + 0.2 === 0.3);  // false

// Решение: округление
const result = 0.1 + 0.2;
console.log(Math.round(result * 100) / 100);  // 0.3
console.log(Number(result.toFixed(2)));       // 0.3
```

### Максимальное безопасное целое число

```javascript
const maxSafe = Number.MAX_SAFE_INTEGER;  // 9007199254740991
const minSafe = Number.MIN_SAFE_INTEGER;  // -9007199254740991

console.log(Number.isSafeInteger(9007199254740991));  // true
console.log(Number.isSafeInteger(9007199254740992));  // false

// Для больших чисел используйте BigInt
const big = 9007199254740992n;  // Корректно работает
```

---

## Полезные методы работы с числами

### Проверка типов

```javascript
Number.isInteger(42);      // true
Number.isInteger(42.5);    // false
Number.isNaN(NaN);         // true
Number.isFinite(42);       // true
Number.isFinite(Infinity); // false
```

### Округление

```javascript
Math.floor(4.7);   // 4 (вниз)
Math.ceil(4.2);    // 5 (вверх)
Math.round(4.5);   // 5 (к ближайшему)
Math.trunc(4.7);   // 4 (удаляет дробную часть)
```

### Преобразование

```javascript
parseInt('42px');        // 42
parseFloat('3.14');      // 3.14
Number('42');            // 42
+'42';                   // 42 (унарный плюс)
```

---

## Примеры использования

### Конвертер систем счисления

```javascript
function convertNumber(num, fromBase, toBase) {
  const decimal = parseInt(num, fromBase);
  return decimal.toString(toBase);
}

console.log(convertNumber('1010', 2, 10));   // '10'
console.log(convertNumber('10', 10, 2));     // '1010'
console.log(convertNumber('FF', 16, 2));     // '11111111'
```

### Работа с большими числами

```javascript
function addLargeBinary(b1, b2) {
  const n1 = BigInt(`0b${b1}`);
  const n2 = BigInt(`0b${b2}`);
  return (n1 + n2).toString(2);
}

console.log(addLargeBinary('1111111111111111', '1'));  
// '10000000000000000'
```

---

*Для понимания работы с объектами см. [objects.md](./objects.md)*
