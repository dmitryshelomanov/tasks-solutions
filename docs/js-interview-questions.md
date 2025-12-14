# Топ-6 вопросов с собеседований по JavaScript

Популярные вопросы уровня Middle с подробными ответами и примерами кода для подготовки к техническим собеседованиям.

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

## Заключение

Эти 6 вопросов покрывают ключевые темы JavaScript уровня Middle, которые часто встречаются на технических собеседованиях. Понимание этих концепций критично для эффективной разработки на JavaScript.

Для углубленного изучения рекомендуется:
- Практиковаться с примерами кода
- Изучать спецификацию ECMAScript
- Решать практические задачи
- Читать исходный код популярных библиотек
