---
outline: 2
---

# Вопросы с собеседований по JavaScript

Популярные вопросы с подробными ответами и примерами кода для подготовки к техническим собеседованиям.

---

## 1. Promise, async/await и обработка ошибок

### Вопрос
Объясните разницу между Promise и async/await. Как правильно обрабатывать ошибки в асинхронном коде? Что произойдет, если не обработать ошибку в Promise?

### Ответ

**Promise** — это объект, представляющий результат асинхронной операции (успешное выполнение или ошибку). **async/await** — синтаксический сахар над Promise, который делает асинхронный код похожим на синхронный.

#### Основные различия:

1. **Синтаксис**: async/await более читаемый и похож на синхронный код
2. **Обработка ошибок**: try/catch с async/await vs .catch() с Promise
3. **Отладка**: async/await предоставляет лучший stack trace

#### Обработка ошибок в Promise:

```js
// Promise с .catch()
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Ошибка:', error));

// Promise без обработки ошибок - ошибка будет "проглочена"
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
// Если произойдет ошибка, она будет необработанной (unhandled rejection)
```

#### Обработка ошибок с async/await:

```js
// С try/catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// Без try/catch - ошибка приведет к отклоненному Promise
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  // Если произойдет ошибка, Promise будет отклонен
}
```

#### Важные моменты:

- **Необработанные ошибки в Promise** приводят к `unhandledrejection` событию
- **Ошибки в async функциях** автоматически преобразуются в отклоненные Promise
- **Promise.all()** отклоняется при первой ошибке, используйте `Promise.allSettled()` для обработки всех результатов

```js
// Promise.all - останавливается на первой ошибке
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error('Одна из промисов отклонена:', error));

// Promise.allSettled - ждет все промисы
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Промис ${index} выполнен:`, result.value);
      } else {
        console.log(`Промис ${index} отклонен:`, result.reason);
      }
    });
  });
```

---

## 2. Hoisting и временная мертвая зона (TDZ)

### Вопрос
Что такое hoisting? Объясните разницу в поведении `var`, `let` и `const` при hoisting. Что такое временная мертвая зона (Temporal Dead Zone)?

### Ответ

**Hoisting** — это механизм JavaScript, при котором объявления переменных и функций "поднимаются" в начало своей области видимости перед выполнением кода.

#### Поведение var:

```js
console.log(x); // undefined (не ReferenceError!)
var x = 5;
console.log(x); // 5

// Эквивалентно:
var x; // объявление поднято, инициализация = undefined
console.log(x); // undefined
x = 5;
console.log(x); // 5
```

#### Поведение let и const:

```js
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 10;
```

#### Временная мертвая зона (TDZ)

**Temporal Dead Zone** — это период между началом области видимости и моментом объявления переменной, когда к ней нельзя обратиться.

```js
// TDZ для 'a' начинается здесь
console.log(typeof a); // ReferenceError (не 'undefined'!)
let a = 1;
// TDZ для 'a' заканчивается здесь

// С var такого не происходит:
console.log(typeof b); // 'undefined' (не ReferenceError)
var b = 1;
```

#### Почему TDZ существует?

1. **Помогает обнаружить ошибки** — обращение к переменной до объявления явно указывает на проблему
2. **Предотвращает использование до инициализации** — гарантирует, что переменная инициализирована перед использованием
3. **Улучшает отладку** — ошибка происходит в месте обращения, а не в месте объявления

#### Примеры:

```js
// Функции тоже поднимаются
sayHello(); // "Hello!" - функция доступна

function sayHello() {
  console.log('Hello!');
}

// Function expression не поднимается
sayGoodbye(); // TypeError: sayGoodbye is not a function

var sayGoodbye = function() {
  console.log('Goodbye!');
};

// let/const function expression
sayHi(); // ReferenceError: Cannot access 'sayHi' before initialization

let sayHi = function() {
  console.log('Hi!');
};
```

#### Важные моменты:

- `var` поднимается с инициализацией `undefined`
- `let` и `const` поднимаются, но остаются в TDZ до объявления
- Функции (function declaration) поднимаются полностью
- Function expression и arrow functions подчиняются правилам переменных

---

## 3. Типы данных, приведение типов и сравнение

### Вопрос
Какие типы данных есть в JavaScript? Объясните разницу между `==` и `===`. Что такое приведение типов (type coercion)? Приведите примеры неочевидного поведения.

### Ответ

#### Типы данных в JavaScript:

**Примитивные типы:**
- `number` (включая `NaN`, `Infinity`, `-Infinity`)
- `string`
- `boolean`
- `undefined`
- `null`
- `symbol` (ES6)
- `bigint` (ES2020)

**Объектные типы:**
- `object` (включая массивы, функции, даты и т.д.)

#### Строгое сравнение (===) vs Нестрогое сравнение (==)

**`===` (строгое сравнение)** — сравнивает значения и типы без приведения типов.

**`==` (нестрогое сравнение)** — приводит типы к одному виду перед сравнением.

```js
// Строгое сравнение
5 === 5;        // true
5 === '5';      // false (разные типы)
null === undefined; // false (разные типы)

// Нестрогое сравнение
5 == 5;         // true
5 == '5';       // true (строка '5' приводится к числу 5)
null == undefined; // true (специальное правило)
```

#### Правила приведения типов:

```js
// Числа и строки
'5' == 5;           // true (строка -> число)
'' == 0;            // true (пустая строка -> 0)
' ' == 0;           // true (пробел -> 0)
'\n' == 0;          // true (перенос строки -> 0)

// Булевы значения
true == 1;          // true (true -> 1)
false == 0;         // true (false -> 0)
true == '1';        // true (true -> 1, '1' -> 1)
false == '';        // true (false -> 0, '' -> 0)

// null и undefined
null == undefined;  // true (специальное правило)
null == 0;          // false (null не приводится к 0)
undefined == 0;     // false

// Объекты
[] == 0;            // true ([] -> '' -> 0)
[0] == 0;        // true ([0] -> '0' -> 0)
[1,2] == '1,2';  // true (массив -> строка)
{} == '[object Object]'; // false (объект не равен строке при ==)
```

#### Неочевидные примеры:

```js
// Массивы
[] == [];           // false (разные объекты)
[] == ![];          // true (![] -> false -> 0, [] -> '' -> 0)
[0] == false;       // true ([0] -> '0' -> 0, false -> 0)

// NaN
NaN == NaN;         // false (NaN не равен самому себе)
NaN === NaN;        // false
isNaN(NaN);         // true
Number.isNaN(NaN);  // true

// null и undefined
null == undefined;  // true
null === undefined; // false
!null;              // true
!undefined;         // true

// Пустые значения
'' == 0;            // true
'' == false;        // true
0 == false;         // true
null == false;      // false
undefined == false; // false
```

#### Лучшие практики:

- **Всегда используйте `===`** для сравнения (кроме случаев, когда явно нужно приведение типов)
- Используйте `Object.is()` для специальных случаев (NaN, -0, +0)
- Для проверки на null/undefined используйте `value == null` (проверяет оба)

```js
// Object.is() - еще более строгое сравнение
Object.is(NaN, NaN);        // true
Object.is(-0, +0);          // false
Object.is(5, 5);            // true
Object.is(5, '5');          // false

// Проверка на null или undefined
function check(value) {
  return value == null; // true для null и undefined
}
```

---

## 4. Замыкания в циклах (классическая проблема с var/let)

### Вопрос
Что выведет следующий код? Объясните разницу в поведении `var` и `let` в циклах. Как правильно создавать замыкания в циклах?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```

### Ответ

#### Проблема с var:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Выведет: 3, 3, 3
```

**Почему так происходит?**

1. `var` имеет функциональную область видимости, не блочную
2. Все итерации цикла используют одну и ту же переменную `i`
3. К моменту выполнения callback'ов setTimeout цикл уже завершился, и `i = 3`
4. Все три callback'а ссылаются на одно и то же значение `i`

#### Решение с let:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Выведет: 0, 1, 2
```

**Почему это работает?**

- `let` имеет блочную область видимости
- Каждая итерация цикла создает новую переменную `i` с новым значением
- Каждый callback "захватывает" свою копию `i` из своей итерации

#### Альтернативные решения:

**1. IIFE (Immediately Invoked Function Expression) с var:**

```js
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Выведет: 0, 1, 2
```

**2. Использование bind:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function(j) {
    console.log(j);
  }.bind(null, i), 100);
}
// Выведет: 0, 1, 2
```

**3. Передача значения через третий параметр setTimeout:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout((j) => console.log(j), 100, i);
}
// Выведет: 0, 1, 2
```

#### Более сложный пример:

```js
var functions = [];

// С var - все функции вернут 3
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i;
  });
}

console.log(functions[0]()); // 3
console.log(functions[1]()); // 3
console.log(functions[2]()); // 3

// С let - каждая функция вернет свое значение
var functions2 = [];
for (let i = 0; i < 3; i++) {
  functions2.push(function() {
    return i;
  });
}

console.log(functions2[0]()); // 0
console.log(functions2[1]()); // 1
console.log(functions2[2]()); // 2
```

#### Почему let работает в циклах?

Спецификация ECMAScript определяет, что для `for (let i = 0; i < n; i++)`:
- Каждая итерация создает новое лексическое окружение
- Переменная `i` переприсваивается в новом окружении
- Замыкания захватывают переменную из своего окружения

```js
// Эквивалентно (упрощенно):
{
  let i = 0;
  setTimeout(() => console.log(i), 100); // захватывает i = 0
}
{
  let i = 1;
  setTimeout(() => console.log(i), 100); // захватывает i = 1
}
{
  let i = 2;
  setTimeout(() => console.log(i), 100); // захватывает i = 2
}
```

#### Важные моменты:

- **Всегда используйте `let` или `const` в циклах** для избежания проблем с замыканиями
- Проблема возникает не только с setTimeout, но и с любыми асинхронными операциями
- Замыкания "захватывают" переменные по ссылке, поэтому важно, чтобы каждая итерация имела свою переменную

---

## 5. Деструктуризация, spread и rest операторы

### Вопрос
Объясните, что такое деструктуризация, spread оператор (`...`) и rest оператор. В чем разница между ними? Приведите практические примеры использования.

### Ответ

#### Деструктуризация (Destructuring)

Деструктуризация — это синтаксис для извлечения значений из массивов или свойств объектов в отдельные переменные.

**Деструктуризация массивов:**

```js
// Базовый пример
const arr = [1, 2, 3];
const [a, b, c] = arr;
console.log(a, b, c); // 1, 2, 3

// Пропуск элементов
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1, 3

// Значения по умолчанию
const [x = 10, y = 20] = [1];
console.log(x, y); // 1, 20

// Обмен переменных
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

**Деструктуризация объектов:**

```js
// Базовый пример
const user = { name: 'John', age: 30, city: 'Moscow' };
const { name, age } = user;
console.log(name, age); // John, 30

// Переименование
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // John, 30

// Значения по умолчанию
const { name, email = 'no-email' } = user;
console.log(name, email); // John, no-email

// Вложенная деструктуризация
const user = {
  name: 'John',
  address: {
    city: 'Moscow',
    street: 'Lenina'
  }
};
const { address: { city } } = user;
console.log(city); // Moscow
```

**Деструктуризация в параметрах функций:**

```js
// Массивы
function sum([a, b, c = 0]) {
  return a + b + c;
}
console.log(sum([1, 2])); // 3
console.log(sum([1, 2, 3])); // 6

// Объекты
function greet({ name, age = 18 }) {
  return `Hello, ${name}! You are ${age} years old.`;
}
console.log(greet({ name: 'John' })); // Hello, John! You are 18 years old.
console.log(greet({ name: 'Jane', age: 25 })); // Hello, Jane! You are 25 years old.
```

#### Spread оператор (`...`)

Spread оператор позволяет "разворачивать" массивы или объекты в местах, где ожидается несколько элементов.

**Spread с массивами:**

```js
// Копирование массива
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2); // [1, 2, 3]
console.log(arr1 === arr2); // false (разные массивы)

// Объединение массивов
const arr3 = [...arr1, 4, 5, 6];
console.log(arr3); // [1, 2, 3, 4, 5, 6]

// Передача аргументов в функцию
const numbers = [1, 2, 3];
Math.max(...numbers); // 3 (эквивалентно Math.max(1, 2, 3))

// Вставка элементов
const arr4 = [0, ...arr1, 4];
console.log(arr4); // [0, 1, 2, 3, 4]
```

**Spread с объектами:**

```js
// Копирование объекта
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1 };
console.log(obj2); // { a: 1, b: 2 }
console.log(obj1 === obj2); // false (разные объекты)

// Объединение объектов
const obj3 = { ...obj1, c: 3 };
console.log(obj3); // { a: 1, b: 2, c: 3 }

// Перезапись свойств
const obj4 = { ...obj1, b: 99 };
console.log(obj4); // { a: 1, b: 99 }

// Глубокое копирование (только первый уровень!)
const nested = { a: 1, b: { c: 2 } };
const shallowCopy = { ...nested };
shallowCopy.b.c = 99;
console.log(nested.b.c); // 99 (изменилось, так как это поверхностная копия)
```

#### Rest оператор (`...`)

Rest оператор собирает оставшиеся элементы в массив или оставшиеся свойства в объект.

**Rest в деструктуризации массивов:**

```js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Rest должен быть последним
const [...rest, last] = [1, 2, 3]; // SyntaxError
```

**Rest в параметрах функций:**

```js
// Собирает все аргументы в массив
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Комбинация обычных параметров и rest
function greet(greeting, ...names) {
  return `${greeting}, ${names.join(', ')}!`;
}
console.log(greet('Hello', 'John', 'Jane')); // Hello, John, Jane!
```

**Rest в деструктуризации объектов:**

```js
const user = { name: 'John', age: 30, city: 'Moscow', country: 'Russia' };
const { name, ...rest } = user;
console.log(name); // John
console.log(rest); // { age: 30, city: 'Moscow', country: 'Russia' }
```

#### Практические примеры:

**1. Клонирование с изменениями:**

```js
// Массивы
const original = [1, 2, 3];
const updated = [...original, 4]; // [1, 2, 3, 4]

// Объекты
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 }; // { name: 'John', age: 31 }
```

**2. Удаление свойств из объекта:**

```js
const user = { name: 'John', age: 30, password: 'secret' };
const { password, ...userWithoutPassword } = user;
console.log(userWithoutPassword); // { name: 'John', age: 30 }
```

**3. Слияние объектов с приоритетом:**

```js
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'ru' };
const config = { ...defaults, ...userPrefs };
console.log(config); // { theme: 'light', lang: 'ru' }
```

**4. Передача пропсов в React:**

```js
function Button({ type, children, ...restProps }) {
  return (
    <button type={type} {...restProps}>
      {children}
    </button>
  );
}
// Все остальные пропсы (onClick, className и т.д.) передаются через restProps
```

#### Важные моменты:

- **Spread** разворачивает элементы (используется в правой части)
- **Rest** собирает элементы (используется в левой части)
- Spread создает поверхностную копию (shallow copy)
- Rest должен быть последним в деструктуризации
- Spread работает с итерируемыми объектами (массивы, строки, Set, Map)

---

## 6. Модули ES6, import/export и область видимости

### Вопрос
Объясните систему модулей ES6. В чем разница между `export` и `export default`? Как работает `import`? Что такое область видимости модуля? Чем модули отличаются от обычных скриптов?

### Ответ

#### Модули ES6

Модули ES6 — это способ организации кода в отдельные файлы с четко определенными зависимостями и изолированной областью видимости.

#### Основные концепции:

1. **Каждый модуль имеет свою область видимости** — переменные не попадают в глобальную область
2. **Строгий режим по умолчанию** — модули всегда работают в strict mode
3. **Статический импорт** — зависимости определяются на этапе компиляции
4. **Топ-уровневый await** — в модулях можно использовать await на верхнем уровне

#### Named Export (именованный экспорт):

```js
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// Или в конце файла
const subtract = (a, b) => a - b;
export { subtract };

// Переименование при экспорте
export { subtract as sub };
```

**Импорт named export:**

```js
// Импорт конкретных элементов
import { PI, add, multiply } from './math.js';

// Импорт всех как объект
import * as math from './math.js';
console.log(math.PI); // 3.14159
console.log(math.add(2, 3)); // 5

// Переименование при импорте
import { add as sum } from './math.js';
```

#### Default Export (экспорт по умолчанию):

```js
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Или функция
export default function createUser(name) {
  return { name };
}

// Или объект
const config = { apiUrl: 'https://api.example.com' };
export default config;
```

**Импорт default export:**

```js
// Импорт default (без фигурных скобок)
import User from './user.js';
import createUser from './user.js';
import config from './user.js';

// Переименование default импорта
import MyUser from './user.js';
```

#### Комбинация named и default:

```js
// utils.js
export const version = '1.0.0';

export default function utils() {
  return 'Utility functions';
}

// Импорт обоих
import utils, { version } from './utils.js';
// или
import { default as utils, version } from './utils.js';
```

#### Область видимости модуля:

```js
// module1.js
const privateVar = 'I am private'; // Не экспортируется - недоступна извне
export const publicVar = 'I am public';

function privateFunction() {
  return 'Private';
}

export function publicFunction() {
  return 'Public';
}

// module2.js
import { publicVar, publicFunction } from './module1.js';
console.log(publicVar); // 'I am public'
console.log(publicFunction()); // 'Public'
// console.log(privateVar); // ReferenceError - недоступна
```

#### Отличия от обычных скриптов:

**Обычные скрипты:**
```html
<script src="script1.js"></script>
<script src="script2.js"></script>
```
- Переменные попадают в глобальную область видимости
- Порядок загрузки важен
- Нет изоляции между файлами

**Модули:**
```html
<script type="module" src="module1.js"></script>
<script type="module" src="module2.js"></script>
```
- Каждый модуль имеет свою область видимости
- Явные зависимости через import/export
- Автоматическая обработка зависимостей
- Отложенное выполнение (deferred)

#### Циклические зависимости:

```js
// a.js
import { b } from './b.js';
export const a = 'a';
export function getB() {
  return b;
}

// b.js
import { a } from './a.js';
export const b = 'b';
export function getA() {
  return a;
}

// main.js
import { a, getB } from './a.js';
import { b, getA } from './b.js';

console.log(a); // 'a'
console.log(b); // 'b'
console.log(getA()); // 'a'
console.log(getB()); // 'b'
// Работает благодаря hoisting экспортов
```

#### Динамический импорт:

```js
// Статический импорт (на этапе компиляции)
import { add } from './math.js';

// Динамический импорт (во время выполнения)
async function loadModule() {
  const { add } = await import('./math.js');
  console.log(add(2, 3));
}

// Или с then
import('./math.js').then(module => {
  console.log(module.add(2, 3));
});
```

#### Re-export (реэкспорт):

```js
// math.js
export function add(a, b) {
  return a + b;
}

// calculator.js
export { add } from './math.js'; // Реэкспорт
export function calculate(expr) {
  return eval(expr);
}

// main.js
import { add, calculate } from './calculator.js';
// add доступен через calculator, хотя определен в math
```

#### Важные моменты:

- **Расширение `.js` обязательно** в некоторых окружениях (Node.js, некоторые бандлеры)
- **Модули всегда в strict mode** — нельзя использовать необъявленные переменные
- **Топ-уровневый `this`** в модулях равен `undefined` (в обычных скриптах — `window`)
- **Импорты hoisting'ятся** — можно использовать до объявления в файле
- **Модули выполняются один раз** — повторный импорт возвращает тот же экземпляр

```js
// module.js
console.log('Module loaded');
export const value = 42;

// main1.js
import { value } from './module.js'; // "Module loaded" выведется один раз

// main2.js
import { value } from './module.js'; // Модуль уже загружен, повторной загрузки не будет
```

---

## 7. Чем отличается авторизация от аутентификации?

### Вопрос
Чем отличается авторизация от аутентификации?

### Ответ

**Аутентификация** — проверка личности: «кто ты?» (логин/пароль, токен, биометрия). Пользователь доказывает, что он тот, за кого себя выдаёт.

**Авторизация** — проверка прав: «что тебе разрешено?» (роли, права доступа). После аутентификации система решает, можно ли выполнить действие (доступ к ресурсу, операция).

Сначала всегда идёт аутентификация, затем авторизация.

---

## 8. Что такое CORS и как он работает?

### Вопрос
Что такое CORS и как он работает?

### Ответ

**CORS** (Cross-Origin Resource Sharing) — механизм браузера, который по правилам сервера разрешает или запрещает запросы с другого источника (другой домен/порт/схема).

**Как работает:** при запросе с `origin: https://app.com` на `https://api.com` браузер отправляет запрос. Сервер отвечает заголовками, например `Access-Control-Allow-Origin: https://app.com` или `*`. Если ответ не содержит подходящего разрешения, браузер блокирует доступ к телу ответа для скрипта.

- **Простой запрос** (GET, POST с простыми заголовками): браузер сразу смотрит CORS-заголовки в ответе.
- **Предзапрос (preflight):** для «непростых» запросов (кастомные заголовки, нестандартный метод и т.п.) браузер сначала шлёт OPTIONS; сервер должен ответить, какие методы/заголовки разрешены.

#### Минусы и ограничения

- Нужна поддержка на сервере (правильные заголовки или прокси). Без неё кросс-доменные запросы из браузера блокируются.
- Preflight добавляет задержку (дополнительный round-trip).

#### Где применять

- Любой фронтенд на одном домене и API на другом (SPA + отдельный бэкенд). Настройка CORS на API обязательна.

```js
// Запрос на другой origin — браузер автоматически добавит Origin и проверит CORS-заголовки в ответе
fetch('https://api.example.com/data')
  .then((res) => res.json())
  .then((data) => console.log(data));
// Если сервер не вернёт Access-Control-Allow-Origin, в консоли будет CORS error
```

---

## 9. Как работает HTTP и из чего состоит HTTP запрос

### Вопрос
Как работает HTTP и из чего состоит HTTP запрос

### Ответ

**HTTP** — текстовый протокол «запрос — ответ» поверх TCP: клиент отправляет запрос, сервер возвращает ответ.

**Состав HTTP-запроса:**

1. **Строка запроса:** метод, путь, версия протокола — например `GET /api/users HTTP/1.1`.
2. **Заголовки (Headers):** метаданные в виде «Имя: значение» — Host, Content-Type, Authorization, Cookie и др.
3. **Пустая строка** — разделитель между заголовками и телом.
4. **Тело (Body):** опционально, для POST/PUT/PATCH — обычно JSON или форма.

Клиент устанавливает TCP-соединение, отправляет запрос, получает ответ с статус-кодом, заголовками и телом, затем соединение может быть закрыто (HTTP/1.1 может переиспользовать его).

```js
// GET — тело пустое
const res = await fetch('https://api.example.com/users/1');
const user = await res.json();

// POST — тело с телом запроса и заголовками
await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' }),
});
```

---

## 10. Как работает HTTPS и отличие от HTTP

### Вопрос
Как работает HTTPS и отличие от HTTP

### Ответ

**HTTPS** — это HTTP поверх TLS (SSL): трафик шифруется и проверяется целостность и подлинность сервера.

**Отличие от HTTP:** по умолчанию используется порт 443, перед обменом HTTP-данными выполняется TLS handshake: согласование версии и шифров, проверка сертификата сервера (и при необходимости клиентского), обмен ключами. Дальше все данные передаются в зашифрованном виде.

**Итог:** конфиденциальность (перехват не даёт прочитать данные), целостность (подмена данных обнаруживается), аутентификация сервера (сертификат подтверждает домен).

---

## 11. HTTP статус коды

### Вопрос
HTTP статус коды

### Ответ

Трёхзначный код в первой строке ответа сервера показывает результат обработки запроса.

- **1xx** — информационные (например, 100 Continue, 101 Switching Protocols).
- **2xx** — успех: 200 OK, 201 Created, 204 No Content.
- **3xx** — перенаправление: 301/302 (редирект), 304 Not Modified (кэш).
- **4xx** — ошибка клиента: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.
- **5xx** — ошибка сервера: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.

На фронте важно обрабатывать хотя бы 4xx/5xx и при необходимости 3xx (редиректы, 304 для кэша).

---

## 12. OWASP Браузерные уязвимости

### Вопрос
OWASP Браузерные уязвимости

### Ответ

**OWASP** (Open Web Application Security Project) публикует топ рисков для веб-приложений. В контексте браузера и фронтенда чаще всего имеют в виду:

- **XSS (Cross-Site Scripting)** — внедрение и выполнение чужого скрипта в странице (кража сессии, подмена контента). Защита: экранирование вывода, CSP, `HttpOnly`/Secure для cookie.
- **CSRF (Cross-Site Request Forgery)** — запрос с чужого сайта от имени пользователя, пока сессия активна. Защита: CSRF-токены, SameSite для cookie, проверка Origin/Referer.
- **Clickjacking** — наложение невидимого iframe/кнопки поверх кнопки жертвы. Защита: X-Frame-Options / CSP frame-ancestors.

Также важно: безопасные заголовки (CSP, HSTS), не хранить секреты в коде/локальном хранилище, валидация и санитизация ввода.

---

## 13. Как работает браузер при вводе запроса и этапы рендера

### Вопрос
Как работает браузер при вводе запроса и этапы рендера

### Ответ

1. **Ввод URL** — браузер определяет протокол, хост, путь; при необходимости выполняет поиск или переход по закладке.
2. **DNS** — разрешение домена в IP (если нет в кэше).
3. **Соединение** — TCP (и при HTTPS — TLS handshake), затем HTTP-запрос.
4. **Ответ** — получение HTML и по нему запросы ресурсов (CSS, JS, изображения).
5. **Парсинг** — построение DOM из HTML, CSSOM из CSS.
6. **Выполнение JS** — парсинг и выполнение скриптов (могут менять DOM).
7. **Дерево рендера (Render tree)** — объединение DOM и CSSOM с учётом стилей и видимости.
8. **Layout (Reflow)** — расчёт позиций и размеров элементов.
9. **Paint** — отрисовка пикселей (слои, краска).
10. **Composite** — сборка слоёв в итоговую картинку и вывод на экран.

После этого обработка событий (ввод, скролл и т.д.) может снова запускать layout/paint/composite.

---

## 14. Когда происходит Reflow и Repaint в браузере

### Вопрос
Когда происходит Reflow и Repaint в браузере

### Ответ

**Reflow (layout)** — пересчёт геометрии: размеры и позиции элементов. Происходит при изменении размеров окна, добавлении/удалении узлов DOM, изменении размеров/полей/шрифтов, обращении к «layout-свойствам» (offsetWidth, getComputedStyle и т.п.), скролле (в части реализаций).

**Repaint** — перерисовка пикселей без пересчёта геометрии. Вызывается при изменении цвета, фона, тени, видимости и других чисто отрисовочных свойств.

Reflow дороже repaint (пересчёт по дереву); repaint дешевле, но тоже не бесплатный. Изменения только transform/opacity обычно обрабатываются на этапе композитинга без reflow и без полного repaint — это оптимально для анимаций.

---

## 15. Что такое REST и принципы REST

### Вопрос
Что такое REST и принципы REST

### Ответ

**REST** (Representational State Transfer) — архитектурный стиль API поверх HTTP: ресурсы идентифицируются URL, операции — методами HTTP.

**Принципы:** ресурсы (сущности) как URI; единый интерфейс — GET (получить), POST (создать), PUT/PATCH (обновить), DELETE (удалить); отсутствие состояния на сервере (каждый запрос самодостаточен); кэшируемость ответов; разделение клиента и сервера.

Типично: JSON в теле, статус-коды по смыслу (200, 201, 404, 400 и т.д.), иерархия ресурсов вида `/users`, `/users/1`, `/users/1/orders`.

#### Где применять

- Публичные и внутренние API для веб/мобильных клиентов, когда нужна простая, предсказуемая модель «ресурс + HTTP-метод».

```js
// Типичные REST-вызовы с fetch
const users = await fetch('/api/users').then((r) => r.json());
const one = await fetch('/api/users/1').then((r) => r.json());
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Bob' }),
});
await fetch('/api/users/1', { method: 'DELETE' });
```

---

## 16. Способы оптимизации приложений

### Вопрос
Способы оптимизации приложений

### Ответ

- **Загрузка:** code splitting, lazy loading роутов и тяжёлых компонентов, минификация и сжатие (gzip/brotli), CDN для статики, предзагрузка критичных ресурсов.
- **Рендер:** виртуализация длинных списков, отложенный рендер ниже первого экрана, оптимизация CRP (критичный CSS, отложенные скрипты), уменьшение reflow/repaint (transform/opacity для анимаций).
- **Сеть:** кэш (HTTP, Service Worker), дебаунс/троттлинг запросов и событий, батчинг API, сжатие payload.
- **Бандл:** дерево-шейкинг, удаление дублей, анализ размера бандла, при необходимости замена тяжёлых библиотек.

```js
// Дебаунс запроса при вводе в поле поиска
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
const search = debounce((q) => fetch(`/api/search?q=${q}`).then(/* ... */), 300);
input.addEventListener('input', (e) => search(e.target.value));
```

---

## 17. Что такое Webpack?

### Вопрос
Что такое Webpack?

### Ответ

**Webpack** — сборщик модулей (module bundler): берёт точку входа и граф зависимостей (import/require), объединяет JS, CSS и другие ресурсы в один или несколько бандлов, применяет загрузчики (loaders) и плагины (plugins).

**Основное:** entry, output, loaders (трансформация файлов, например babel-loader, css-loader), plugins (минификация, HTML, code splitting, env). Поддерживает code splitting, tree shaking, горячую перезагрузку (HMR).

#### Минусы и ограничения

- Сложная конфигурация; альтернативы (Vite, esbuild, Parcel) часто проще и быстрее для типовых проектов.

#### Где применять

- Крупные приложения с кастомной сборкой, legacy-проекты, когда нужен жёсткий контроль над бандлом и плагинами.

---

## 18. Иммутабельность и мутабельность

### Вопрос
Иммутабельность и мутабельность

### Ответ

**Мутабельность** — объект можно изменить «на месте» (добавить/удалить поля, изменить элементы массива). В JS объекты и массивы мутабельны.

**Иммутабельность** — данные не меняются; при «изменении» создаётся новая копия. Примитивы в JS иммутабельны (число, строка при «изменении» дают новое значение).

Плюсы иммутабельности: проще отладка и предсказуемость, удобно сравнивать по ссылке, подходит для реактивных моделей (React, Redux) и многопоточности. Минусы — расход памяти и CPU на копирование; в JS копии делают вручную или через библиотеки (Immer, spread, slice и т.п.).

```js
// Мутация (исходный массив меняется)
const a = [1, 2, 3];
a.push(4);

// Иммутабельное «добавление» — новый массив
const b = [1, 2, 3];
const c = [...b, 4];
// b не изменился, c — новая ссылка
```

---

## 19. Shadow DOM

### Вопрос
Shadow DOM

### Ответ

**Shadow DOM** — поддерево DOM, изолированное от основного документа: стили и разметка внутри не «протекают» наружу, глобальные стили можно не пускать внутрь (режим closed/open). Создаётся через `element.attachShadow({ mode: 'open' })`, контент вешается в полученный корень.

Используется в веб-компонентах для инкапсуляции разметки и стилей (виджеты, кастомные элементы), чтобы избежать конфликтов имён классов и CSS.

#### Минусы и ограничения

- Сложнее отлаживать и стилизовать извне; не все глобальные стили (например, наследуемые) применяются ожидаемо без явной настройки.

#### Где применять

- Веб-компоненты, переиспользуемые UI-кирпичики, виджеты, встроенные в чужую страницу.

```js
// Создание Shadow DOM и изолированная разметка/стили
const host = document.getElementById('widget');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  <style>p { color: blue; }</style>
  <p>Это внутри shadow root — стили не утекают наружу.</p>
`;
```

---

## 20. Cookie

### Вопрос
Cookie

### Ответ

**Cookie** — небольшие строки (до ~4 КБ), которые сервер просит сохранить через заголовок `Set-Cookie`; браузер отправляет их обратно в заголовке `Cookie` при запросах на тот же домен. Имеют срок жизни, путь, домен, флаги `HttpOnly` (недоступны из JS), `Secure` (только HTTPS), `SameSite` (защита от CSRF).

Используются для сессий, идентификации, простых настроек. Ограничены размером и количеством на домен, отправляются с каждым запросом — для больших данных лучше LocalStorage/другие хранилища.

#### Минусы и ограничения

- Маленький объём; передаются с каждым запросом; уязвимы к XSS (если не HttpOnly) и к CSRF (без SameSite).

#### Где применять

- Сессионные идентификаторы, токены (с HttpOnly/Secure), согласие на cookie, языковые/темы, если нужно отправлять данные на сервер с каждым запросом.

```js
// Чтение и запись cookie из JS (cookie без HttpOnly)
document.cookie; // все cookie строкой
document.cookie = 'theme=dark; path=/; max-age=3600'; // установить
document.cookie = 'theme=; path=/; max-age=0';      // удалить
// HttpOnly cookie из JS прочитать нельзя — только сервер через Set-Cookie
```

---

## 21. Как дебажить приложение и находить утечки памяти

### Вопрос
Как дебажить приложение и находить утечки памяти

### Ответ

- **DevTools → Memory:** снимки heap (Heap snapshot), сравнение до/после действия. Ищем объекты, которые не должны оставаться (отсоединённые DOM, замыкания, подписки).
- **Performance/Memory:** запись с «Allocation instrumentation» или «Allocation sampling» — смотрим, что создаётся и не освобождается.
- **Типичные причины утечек:** глобальные переменные и замыкания, держащие большие объекты; не снятые слушатели (addEventListener без removeEventListener); таймеры (setInterval/setTimeout); ссылки на DOM из отключённых компонентов (например, в SPA при смене роута).

Рекомендуется: воспроизвести сценарий (например, открыть/закрыть модалку несколько раз), снять snapshot до и после, сравнить и найти растущие по количеству объекты и цепочки удержания.

---

## 22. Хранилища в браузере: Cookie, LocalStorage, SessionStorage и IndexedDB

### Вопрос
Хранилища в браузере: Cookie, LocalStorage, SessionStorage и IndexedDB

### Ответ

- **Cookie** — маленький объём, отправляются с каждым запросом на домен; срок жизни, путь, HttpOnly, Secure, SameSite. Для сессий и идентификации.
- **LocalStorage** — ключ–значение, ~5–10 МБ на домен, данные не истекают, доступны во всех вкладках того же origin. Синхронный API. Для настроек, черновиков, офлайн-данных.
- **SessionStorage** — как LocalStorage, но живёт только в рамках вкладки; при закрытии вкладки данные теряются. Для временных данных одной сессии.
- **IndexedDB** — асинхронная NoSQL БД в браузере, большие объёмы, индексы, транзакции. Для офлайн-приложений, кэша объёмных данных, PWA.

#### Где применять

- Cookie — то, что должно уходить на сервер (сессия, токен). LocalStorage/SessionStorage — локальное состояние и настройки. IndexedDB — большие структуры и офлайн.

```js
// LocalStorage — синхронно, все вкладки одного origin
localStorage.setItem('key', JSON.stringify({ a: 1 }));
const data = JSON.parse(localStorage.getItem('key'));
localStorage.removeItem('key');

// SessionStorage — только текущая вкладка
sessionStorage.setItem('temp', 'value');
```

---

## 23. Способы получения данных с сервера: Server-Sent Events, Polling и Long Polling

### Вопрос
Способы получения данных с сервера: Server-Sent Events, Polling и Long Polling

### Ответ

- **Polling** — клиент периодически опрашивает сервер (например, раз в N секунд). Просто, но задержка до N секунд и лишние запросы при отсутствии изменений.
- **Long Polling** — клиент отправляет запрос и ждёт; сервер держит соединение открытым до появления данных или таймаута, затем клиент сразу делает следующий запрос. Меньше пустых запросов, но сложнее на сервере и при реконнектах.
- **SSE (Server-Sent Events)** — одно постоянное HTTP-соединение, сервер пушит события в формате текстового потока. Только сервер → клиент. Встроенная поддержка в браузерах (EventSource), автопереподключение.

Для двустороннего обмена в реальном времени чаще используют WebSocket.

#### Где применять

- SSE: уведомления, ленты, дашборды (данные в основном с сервера). Polling/Long Polling — когда WebSocket/SSE недоступны или избыточны.

```js
// SSE — клиент: один поток, сервер пушит события
const es = new EventSource('/api/stream');
es.onmessage = (e) => console.log(e.data);
es.onerror = () => es.close();
// Сервер отдаёт поток с Content-Type: text/event-stream и строками "data: ...\n\n"
```

---

## 24. Что такое прогрессивный рендеринг в веб-разработке

### Вопрос
Что такое прогрессивный рендеринг в веб-разработке

### Ответ

**Прогрессивный рендеринг** — подход, при котором контент показывается по мере готовности: сначала критичное (первый экран, скелетон), затем подгружаются и отрисовываются следующие части без блокировки всего интерфейса.

Приёмы: потоковая отдача HTML (chunked), ленивая загрузка изображений и скриптов, приоритет критичного CSS и отложенный некритичный CSS, разбиение контента на «страницы» или виртуализация списков. Цель — быстрый первый отклик (FCP, LCP) и плавное появление остального.

#### Где применять

- Длинные ленты, каталоги, дашборды, любые страницы с большим объёмом контента ниже первого экрана.

---

## 25. CSR, SSR, SSG, ISR — разница между стратегиями рендеринга

### Вопрос
CSR, SSR, SSG, ISR — разница между стратегиями рендеринга

### Ответ

- **CSR (Client-Side Rendering)** — HTML почти пустой, разметка строится в браузере после загрузки JS. Плюсы: простая разработка, богатая интерактивность. Минусы: медленный первый контент и SEO без доп. решений.
- **SSR (Server-Side Rendering)** — HTML страницы генерируется на сервере при каждом запросе и отдаётся готовым. Быстрый первый отрисовка и хороший SEO; нагрузка на сервер и задержка TTFB.
- **SSG (Static Site Generation)** — HTML генерируется на этапе сборки, отдаётся как статика. Максимально быстрая отдача и кэширование; подходит для контента, который не меняется при каждом запросе.
- **ISR (Incremental Static Regeneration)** — статические страницы с фоновым обновлением: по истечении revalidate страница перегенерируется, пользователи получают кэш, затем свежую версию. Компромисс между SSG и актуальностью.

#### Где применять

- CSR: внутренние дашборды, приложения с сильной интерактивностью. SSR: маркетинг, каталоги, SEO-критичные страницы. SSG: блоги, лендинги. ISR: большие каталоги с периодическим обновлением.

---

## 26. Что такое Service Worker?

### Вопрос
Что такое Service Worker?

### Ответ

**Service Worker** — скрипт в отдельном потоке, работающий в фоне между браузером и сетью. Может перехватывать запросы (fetch), кэшировать ответы, отдавать контент офлайн, показывать push-уведомления.

Жизненный цикл: регистрация, установка (install), активация (activate), затем работа до обновления или удаления. Работает только по HTTPS (кроме localhost). Не имеет доступа к DOM; обмен с страницей — через postMessage.

#### Минусы и ограничения

- Сложность отладки и обновления (кэш, версии); при ошибках можно «сломать» загрузку страницы, нужна аккуратная стратегия обновления.

#### Где применять

- PWA, офлайн-режим, кэширование статики и API, push-уведомления, фоновые синхронизации.

```js
// Регистрация Service Worker (в главном скрипте страницы)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((reg) => {
    console.log('SW зарегистрирован', reg.scope);
  });
}
// sw.js — в install кэшируем статику, в fetch перехватываем запросы и отдаём из кэша или сети
```

---

## 27. Что такое Web Worker?

### Вопрос
Что такое Web Worker?

### Ответ

**Web Worker** — скрипт, выполняющийся в отдельном потоке, параллельно основному. Не имеет доступа к DOM и к части API главного потока; обмен данными только через `postMessage` и `onmessage`.

Используется для тяжёлых вычислений (парсинг, криптография, обработка данных), чтобы не блокировать главный поток и не «подвисать» интерфейс. Shared Worker (где поддерживается) может быть общим для нескольких вкладок.

#### Минусы и ограничения

- Нет доступа к DOM и к ряду глобальных объектов; данные передаются копированием (или через Transferable). Оверхед на создание и передачу сообщений.

#### Где применять

- Тяжёлые вычисления, большие массивы, криптография, предобработка перед отрисовкой (например, разбор большого JSON/файла).

```js
// Главный поток: создаём воркера и обмениваемся сообщениями
const worker = new Worker('/worker.js');
worker.postMessage({ data: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log('Результат:', e.data);

// worker.js:
// onmessage = (e) => {
//   const sum = e.data.data.reduce((a, b) => a + b, 0);
//   postMessage(sum);
// };
```

---

## 28. Что такое Critical Rendering Path (CRP) в браузере

### Вопрос
Что такое Critical Rendering Path (CRP) в браузере

### Ответ

**Critical Rendering Path (CRP)** — цепочка шагов от получения байтов HTML до первой отрисовки (first paint): загрузка HTML → парсинг → построение DOM; параллельно загрузка и парсинг CSS → CSSOM; выполнение блокирующих скриптов может откладывать использование DOM/CSSOM; объединение DOM и CSSOM в render tree → layout → paint → composite.

Оптимизация CRP: уменьшать блокирующий CSS (критичный inline или в начале), откладывать некритичный JS (async/defer), минимизировать размер и количество ресурсов на первом экране, чтобы быстрее получить FCP/LCP.

---

## 29. Что такое CDN и зачем он нужен?

### Вопрос
Что такое CDN и зачем он нужен

### Ответ

**CDN** (Content Delivery Network) — сеть серверов по разным регионам, раздающих копии контента (статика, иногда API). Запрос направляется на ближайший узел (по гео или по доступности), что снижает задержку и разгружает origin-сервер.

**Зачем:** быстрее загрузка для пользователей по всему миру, меньше нагрузка на основной сервер, лучшая устойчивость к пикам и сбоям. Часто используется для скриптов, стилей, изображений, шрифтов, медиа.

#### Где применять

- Публичная статика (JS/CSS/картинки/шрифты), большие медиафайлы, глобальные приложения с аудиторией в разных регионах.

---

## 30. Виды тестирования фронтенда

### Вопрос
Виды тестирования фронтенда

### Ответ

- **Unit** — тесты отдельных функций/модулей в изоляции (Jest, Vitest). Быстро, много покрытия логики.
- **Компонентное (Component)** — рендер и поведение UI-компонентов в изоляции (Testing Library, Vue Test Utils). Проверка пропсов, событий, доступности.
- **Интеграционное** — взаимодействие нескольких модулей или слоёв (API + состояние + UI).
- **E2E (End-to-End)** — сценарии в реальном браузере от действия пользователя до результата (Playwright, Cypress). Медленно, но проверяют полный путь.
- **Визуальное (Visual regression)** — сравнение скриншотов интерфейса до/после изменений.
- **Доступность (a11y)** — автоматические проверки по правилам (axe, jest-axe) и ручной аудит.

Обычно комбинируют: много unit/компонентных тестов, меньше интеграционных, выборочные E2E для критичных сценариев.

---

## 31. Что такое трёхстороннее рукопожатие (Three-way Handshake)?

### Вопрос
Что такое трёхстороннее рукопожатие (Three-way Handshake)?

### Ответ

**Three-way handshake** — установка TCP-соединения в три шага перед обменом данными:

1. **SYN** — клиент отправляет пакет с флагом SYN (и начальный номер последовательности). «Хочу установить соединение».
2. **SYN-ACK** — сервер отвечает SYN + ACK (подтверждение и свой номер последовательности). «Готов, твой запрос принят».
3. **ACK** — клиент отправляет ACK. «Принял, можно передавать данные».

После этого соединение считается установленным (ESTABLISHED), и по нему идёт обмен данными. Разрыв — по аналогии, через FIN или RST.

---

## 32. Архитектура современного браузера

### Вопрос
Архитектура современного браузера

### Ответ

Современный браузер — многопроцессная система:

- **Browser process** — один на браузер: UI, вкладки, сетевая часть, доступ к диску. Координирует остальные процессы.
- **Renderer process** — обычно по процессу на вкладку (или на группу вкладок): парсинг HTML/CSS, layout, JS (в том числе движок V8). Изоляция вкладок: падение одной не роняет остальные.
- **GPU process** — отрисовка и композитинг, аппаратное ускорение.
- **Plugin/Utility processes** — расширения, сетевая утилита и т.д., при необходимости.

Внутри renderer-процесса: основной поток (DOM, стили, JS основного контекста), воркеры, композитный поток. Память и CPU разделены между процессами, что повышает стабильность и безопасность.

---

## 33. Parsing Pipeline: от байтов до DOM и CSSOM

### Вопрос
Parsing Pipeline: от байтов до DOM и CSSOM

### Ответ

**Парсинг HTML:** байты приходят по сети → декодирование в символы (например, UTF-8) → токенизация (теги, атрибуты) → дерево элементов → построение **DOM** (Document Object Model). Скрипты могут блокировать парсер (по умолчанию) или выполняться асинхронно (async/defer).

**Парсинг CSS:** байты CSS → символы → токены → правила и селекторы → **CSSOM** (дерево стилей с учётом каскада и специфичности).

DOM и CSSOM независимы; для отрисовки они объединяются в render tree (только видимые узлы с вычисленными стилями). Затем layout (расчёт позиций и размеров) и paint.

---

## 34. Архитектура V8: от кода до машинных инструкций

### Вопрос
Архитектура V8: от кода до машинных инструкций

### Ответ

**V8** — JS-движок (Chrome, Node.js). Краткий путь выполнения:

1. **Парсинг** — исходный код → AST (Abstract Syntax Tree).
2. **Ignition (интерпретатор)** — AST → байткод, байткод выполняется. Быстрый старт, умеренная скорость.
3. **TurboFan (JIT-компилятор)** — «горячие» функции компилируются в машинный код. Оптимизации по типам и формам объектов (hidden classes, inline cache). При смене предположений возможен откат (deoptimization).
4. **Выполнение** — машинный код выполняется на CPU.

Также: Orinoco (сборка мусора, в основном параллельная и инкрементальная). Результат — быстрый запуск за счёт интерпретатора и высокая скорость за счёт оптимизированного машинного кода для горячих участков.

---

## 35. HTTP/2 vs HTTP/3: эволюция протокола

### Вопрос
HTTP/2 vs HTTP/3: эволюция протокола

### Ответ

**HTTP/2:** один TCP-соединение на origin, мультиплексирование потоков (много запросов/ответов параллельно без блокировки друг друга), сжатие заголовков (HPACK), серверный push (редко используется). Остаётся зависимость от TCP: потеря пакета блокирует все потоки на этом соединении (head-of-line blocking на уровне TCP).

**HTTP/3:** поверх QUIC (UDP), а не TCP. Встроенное шифрование (TLS 1.3), быстрый handshake (0-RTT при повторных соединениях), мультиплексирование без head-of-line blocking на уровне транспорта: потеря пакета по одному потоку не блокирует остальные. Лучше ведёт себя при нестабильной сети.

**Итог:** HTTP/3 — эволюция для снижения задержек и устойчивости к потерям; семантика HTTP (методы, заголовки, коды) та же.

---

## 36. Resource Loading Strategies

### Вопрос
Resource Loading Strategies

### Ответ

Стратегии загрузки ресурсов определяют, когда и как подгружать скрипты, стили и медиа:

- **Блокирующий скрипт** (`<script src="...">`) — парсинг HTML останавливается до загрузки и выполнения. Используется для критичного кода, который должен выполниться до отрисовки.
- **async** — скрипт загружается параллельно, выполняется сразу после загрузки (возможен порядок не по разметке). Для независимых скриптов (аналитика, виджеты).
- **defer** — загрузка параллельно, выполнение после разбора HTML, в порядке появления в документе. Для скриптов, зависящих от DOM.
- **preload** — явная ранняя загрузка важного ресурса (шрифт, критичный скрипт/стиль).
- **prefetch** — низкий приоритет, подгрузка «на будущее» (следующая страница, следующий шаг).
- **lazy loading** — загрузка при появлении в viewport (изображения `loading="lazy"`, динамический import для кода).

Выбор стратегии влияет на CRP, FCP и LCP; обычно критичное — раньше и с приоритетом, остальное — отложенно или лениво.

```js
// В HTML: <script src="app.js" defer></script> — загрузка параллельно, выполнение после DOM
// <script src="analytics.js" async></script> — порядок выполнения не гарантирован

// Динамический import — ленивая загрузка модуля (code splitting)
document.getElementById('openEditor').onclick = async () => {
  const { initEditor } = await import('./editor.js');
  initEditor();
};
```

---

## Заключение

Эти 36 вопросов покрывают ключевые темы JavaScript уровня Middle, которые часто встречаются на технических собеседованиях. Понимание этих концепций критично для эффективной разработки на JavaScript.

Для углубленного изучения рекомендуется:
- Практиковаться с примерами кода
- Изучать спецификацию ECMAScript
- Решать практические задачи
- Читать исходный код популярных библиотек


