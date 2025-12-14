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

## Топ-10 вопросов с собеседований по TypeScript

Продвинутые вопросы уровня Middle+ с подробными ответами и примерами кода для подготовки к техническим собеседованиям.

---

## 1. Union и Intersection типы, разница и практическое применение

### Вопрос
Объясните разницу между union (`|`) и intersection (`&`) типами в TypeScript. В каких случаях использовать каждый из них? Что происходит при пересечении несовместимых типов?

### Ответ

**Union типы** (`|`) — это тип, который может быть одним из нескольких типов. Объект с union типом должен иметь свойства, общие для всех типов в union.

**Intersection типы** (`&`) — это тип, который объединяет все свойства из всех типов. Объект с intersection типом должен иметь все свойства из всех типов.

#### Union типы:

```ts
type StringOrNumber = string | number;

function process(value: StringOrNumber) {
  // value может быть либо string, либо number
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}

// Union с объектами
type Circle = { kind: 'circle'; radius: number };
type Square = { kind: 'square'; side: number };
type Shape = Circle | Square;

function area(shape: Shape) {
  // TypeScript требует проверку типа (type narrowing)
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
  return shape.side ** 2;
}
```

**Важное правило для union объектов:**
- Можно обращаться только к общим свойствам без type narrowing
- После type narrowing доступны все свойства конкретного типа

```ts
type A = { a: number; common: string };
type B = { b: string; common: string };
type AB = A | B;

function test(x: AB) {
  console.log(x.common); // ✅ OK - общее свойство
  // console.log(x.a); // ❌ Error - не общее свойство
  // console.log(x.b); // ❌ Error - не общее свойство
  
  if ('a' in x) {
    console.log(x.a); // ✅ OK - type narrowing
  }
}
```

#### Intersection типы:

```ts
type Person = { name: string; age: number };
type Employee = { company: string; salary: number };
type PersonEmployee = Person & Employee;

// PersonEmployee требует все свойства:
const worker: PersonEmployee = {
  name: 'John',
  age: 30,
  company: 'Acme',
  salary: 50000
};

// Пересечение примитивов - получается never
type Impossible = string & number; // never (не может быть одновременно string и number)

// Пересечение объектов с конфликтующими свойствами
type A = { prop: string };
type B = { prop: number };
type Conflict = A & B; // { prop: never } - свойство не может быть одновременно string и number
```

#### Практические примеры:

**1. Расширение типов:**
```ts
type BaseUser = { id: number; email: string };
type AdminUser = BaseUser & { role: 'admin'; permissions: string[] };
type RegularUser = BaseUser & { role: 'user' };

type User = AdminUser | RegularUser;
```

**2. Миксины:**
```ts
type Timestamped = { createdAt: Date; updatedAt: Date };
type Identifiable = { id: string };
type Entity = Timestamped & Identifiable;

const product: Entity = {
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date()
};
```

**3. Условная логика с union:**
```ts
type Success<T> = { success: true; data: T };
type Error = { success: false; error: string };
type Result<T> = Success<T> | Error;

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.data); // TypeScript знает, что это Success<T>
  } else {
    console.log(result.error); // TypeScript знает, что это Error
  }
}
```

#### Важные моменты:

- **Union (`|`)** = "или" — значение должно соответствовать хотя бы одному типу
- **Intersection (`&`)** = "и" — значение должно соответствовать всем типам
- Union объектов даёт доступ только к общим свойствам
- Intersection объектов объединяет все свойства
- Пересечение несовместимых типов даёт `never`

---

## 2. Type Assertions и Type Guards — когда и как использовать

### Вопрос
В чем разница между type assertion (`as`) и type guard? Когда использовать каждый подход? Какие проблемы безопасности могут возникнуть при неправильном использовании type assertions?

### Ответ

**Type Assertion** (`as`) — это способ сказать TypeScript: "я знаю лучше, это определенный тип", без проверки во время выполнения.

**Type Guard** — это функция, которая выполняет проверку во время выполнения и сужает тип.

#### Type Assertions:

```ts
// Синтаксис 'as'
const element = document.getElementById('myId') as HTMLInputElement;
element.value = 'test'; // TypeScript считает, что это HTMLInputElement

// Синтаксис угловых скобок (не рекомендуется в JSX)
const value = <string>someValue;

// Двойное assertion (когда типы несовместимы)
const value = 'hello' as unknown as number; // ⚠️ Опасно! Может привести к ошибкам
```

**Проблемы type assertions:**
- Нет проверки во время выполнения
- Может привести к ошибкам, если тип неправильный
- TypeScript доверяет вам полностью

```ts
interface User {
  name: string;
  age: number;
}

const data = JSON.parse('{"name": "John"}') as User;
console.log(data.age); // undefined, но TypeScript думает, что это number
data.age.toFixed(2); // Runtime error! Cannot read property 'toFixed' of undefined
```

#### Type Guards:

**1. typeof guards:**
```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript знает, что value - string
  }
}
```

**2. instanceof guards:**
```ts
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Cat {
  meow() {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript знает, что это Dog
  } else {
    animal.meow(); // TypeScript знает, что это Cat
  }
}
```

**3. in operator guards:**
```ts
type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly(); // TypeScript знает, что это Bird
  } else {
    animal.swim(); // TypeScript знает, что это Fish
  }
}
```

**4. Custom type guards с discriminated unions:**
```ts
type Success<T> = { success: true; data: T };
type Failure = { success: false; error: string };

function isSuccess<T>(result: Success<T> | Failure): result is Success<T> {
  return result.success === true;
}

function handleResult<T>(result: Success<T> | Failure) {
  if (isSuccess(result)) {
    console.log(result.data); // TypeScript знает, что это Success<T>
  } else {
    console.log(result.error); // TypeScript знает, что это Failure
  }
}
```

**5. Type guards с объектами:**
```ts
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  permissions: string[];
}

function isAdmin(user: User | Admin): user is Admin {
  return 'permissions' in user;
}

function getUserRole(user: User | Admin) {
  if (isAdmin(user)) {
    return user.permissions; // TypeScript знает, что это Admin
  }
  return 'regular'; // TypeScript знает, что это User
}
```

#### Практические примеры:

**Безопасная валидация данных:**
```ts
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).email === 'string'
  );
}

function processUser(data: unknown) {
  if (isUser(data)) {
    // Безопасно использовать data как User
    console.log(data.name, data.email);
  } else {
    throw new Error('Invalid user data');
  }
}
```

**Сравнение подходов:**
```ts
// ❌ Плохо: type assertion без проверки
const user = JSON.parse(data) as User;
user.email.toLowerCase(); // Может упасть, если email не строка

// ✅ Хорошо: type guard с проверкой
if (isUser(JSON.parse(data))) {
  user.email.toLowerCase(); // Безопасно
}
```

#### Важные моменты:

- **Type assertion** — только для компиляции, нет проверки во время выполнения
- **Type guard** — проверяет во время выполнения и сужает тип
- Всегда предпочитайте type guards для безопасности
- Type assertions уместны при работе с DOM API, когда точно знаете тип
- Двойные assertions (`as unknown as T`) — признак проблемной архитектуры

---

## 3. Conditional Types (условные типы) и их применение

### Вопрос
Что такое conditional types в TypeScript? Как они работают? Объясните синтаксис `T extends U ? X : Y`. Приведите примеры практического использования.

### Ответ

**Conditional Types** — это типы, которые выбирают один из двух типов на основе условия, проверяющего, расширяет ли один тип другой.

#### Базовый синтаксис:

```ts
T extends U ? X : Y
```

Это читается как: "Если тип T расширяет тип U, то тип X, иначе тип Y".

#### Простые примеры:

```ts
// Проверка, является ли тип строкой
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
type Test3 = IsString<'literal'>; // true

// Извлечение типа элемента массива
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element1 = ArrayElement<string[]>; // string
type Element2 = ArrayElement<number[]>; // number
type Element3 = ArrayElement<boolean>; // never

// Проверка, является ли тип функцией
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type Test4 = IsFunction<() => void>; // true
type Test5 = IsFunction<string>; // false
```

#### Infer keyword:

`infer` позволяет вывести тип внутри conditional type.

```ts
// Извлечение типа возвращаемого значения функции
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type FuncReturn = ReturnType<() => string>; // string
type NumberReturn = ReturnType<() => number>; // number

// Извлечение типа первого аргумента
type FirstArg<T> = T extends (arg: infer U, ...args: any[]) => any ? U : never;

type First = FirstArg<(x: string, y: number) => void>; // string

// Извлечение типа свойства объекта
type PropertyType<T, K extends keyof T> = T[K];

type User = { name: string; age: number };
type NameType = PropertyType<User, 'name'>; // string
```

#### Распределительные conditional types:

Когда conditional type применяется к union типу, он распределяется по каждому члену union.

```ts
// Распределение по union
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>; 
// Распадается на: string[] | number[] (не (string | number)[])

// Предотвращение распределения с помощью []
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArray2 = ToArrayNonDist<string | number>;
// Результат: (string | number)[]
```

#### Практические примеры:

**1. Утилита для извлечения промисов:**
```ts
type UnwrapPromise<T> = T extends Promise<infer U> 
  ? U extends Promise<any> 
    ? UnwrapPromise<U> 
    : U 
  : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<Promise<Promise<number>>>; // number (рекурсивно)
type C = UnwrapPromise<string>; // string
```

**2. Flatten типов:**
```ts
type Flatten<T> = T extends (infer U)[] 
  ? U extends any[] 
    ? Flatten<U> 
    : U 
  : T;

type Nested = Flatten<number[][]>; // number
type Deep = Flatten<number[][][]>; // number (рекурсивно)
```

**3. Проверка наличия свойства:**
```ts
type HasProperty<T, K extends string> = K extends keyof T ? true : false;

type User = { name: string; age: number };
type HasName = HasProperty<User, 'name'>; // true
type HasEmail = HasProperty<User, 'email'>; // false
```

**4. Условное добавление свойств:**
```ts
type ApiResponse<T, E extends boolean = false> = E extends true
  ? { data: T; error: string }
  : { data: T };

type SuccessResponse = ApiResponse<string>; // { data: string }
type ErrorResponse = ApiResponse<string, true>; // { data: string; error: string }
```

**5. Извлечение параметров функции:**
```ts
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;

type FuncParams = Parameters<(a: string, b: number) => void>; // [string, number]
```

**6. Условное исключение never:**
```ts
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>; // number | boolean
```

**7. Сложный пример: извлечение типа из вложенной структуры:**
```ts
type ExtractNested<T> = T extends { data: infer U }
  ? U extends { value: infer V }
    ? V
    : U
  : never;

type Nested = { data: { value: number } };
type Extracted = ExtractNested<Nested>; // number
```

#### Реальные применения:

**Выбор типа на основе флага:**
```ts
type ConditionalProps<T extends boolean> = T extends true
  ? { required: true; defaultValue: string }
  : { required?: false; defaultValue?: string };

function createField<T extends boolean>(isRequired: T): ConditionalProps<T> {
  if (isRequired) {
    return { required: true, defaultValue: '' } as ConditionalProps<T>;
  }
  return {} as ConditionalProps<T>;
}
```

#### Важные моменты:

- Conditional types вычисляются во время компиляции
- Распределительное поведение применяется к union типам
- `infer` работает только в extends части conditional type
- Conditional types могут быть рекурсивными
- Используются для создания сложных utility types

---

## 4. Mapped Types и их практическое применение

### Вопрос
Что такое mapped types в TypeScript? Объясните синтаксис `{ [K in keyof T]: ... }`. Как создавать новые типы на основе существующих? Приведите примеры utility types, построенных на mapped types.

### Ответ

**Mapped Types** — это способ создания новых типов путем преобразования свойств существующего типа. Они похожи на итерацию по ключам объекта.

#### Базовый синтаксис:

```ts
{ [K in keyof T]: U }
```

Это читается как: "Для каждого ключа K в типе T, создай свойство с типом U".

#### Простые примеры:

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P]; // -? удаляет опциональность
};

interface User {
  name: string;
  age?: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age?: number; }

type PartialUser = Partial<User>;
// { name?: string; age?: number; }

type RequiredUser = Required<User>;
// { name: string; age: number; }
```

#### Преобразование типов свойств:

```ts
// Преобразование всех свойств в строки
type Stringify<T> = {
  [K in keyof T]: string;
};

type User = { name: string; age: number };
type StringUser = Stringify<User>; // { name: string; age: string; }

// Преобразование с сохранением типов
type Optional<T> = {
  [K in keyof T]?: T[K];
};
```

#### Фильтрация свойств:

```ts
// Выбор только строковых свойств
type StringKeys<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

type User = { name: string; age: number; email: string };
type StringProps = StringKeys<User>; // { name: string; email: string; }

// Исключение определенных свойств
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type WithoutAge = Omit<User, 'age'>; // { name: string; email: string; }
```

#### Переименование ключей:

```ts
// Добавление префикса к ключам
type AddPrefix<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
};

type User = { name: string; age: number };
type PrefixedUser = AddPrefix<User, 'user_'>; 
// { user_name: string; user_age: number; }

// Преобразование camelCase в UPPER_SNAKE_CASE
type ToUpperSnake<T extends string> = 
  T extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest extends `${infer F}${infer R}`
      ? F extends Uppercase<F>
        ? ToUpperSnake<`${F}${R}`>
        : `_${Uppercase<F>}${ToUpperSnake<R>}`
      : ''}`
    : T;
```

#### Комбинирование mapped types:

```ts
// Pick - выбор определенных свойств
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type User = { name: string; age: number; email: string };
type UserBasic = Pick<User, 'name' | 'email'>; 
// { name: string; email: string; }

// Record - создание объекта с определенными ключами и значениями
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type UserRoles = Record<'admin' | 'user' | 'guest', boolean>;
// { admin: boolean; user: boolean; guest: boolean; }
```

#### Модификаторы доступа:

```ts
// Удаление readonly
type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyUser = { readonly name: string; readonly age: number };
type WritableUser = Writable<ReadonlyUser>; 
// { name: string; age: number; }

// Удаление опциональности (как Required)
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

#### Практические примеры:

**1. Deep Readonly:**
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type Nested = {
  a: number;
  b: {
    c: string;
    d: { e: boolean };
  };
};

type DeepReadonlyNested = DeepReadonly<Nested>;
// Все уровни вложенности становятся readonly
```

**2. Nullable свойства:**
```ts
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type User = { name: string; age: number };
type NullableUser = Nullable<User>; 
// { name: string | null; age: number | null; }
```

**3. Выбор свойств по типу значения:**
```ts
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type User = { name: string; age: number; email: string };
type StringProps = PickByType<User, string>; 
// { name: string; email: string; }
```

**4. Создание геттеров:**
```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = { name: string; age: number };
type UserGetters = Getters<User>; 
// { getName: () => string; getAge: () => number; }
```

**5. Immutable update паттерн:**
```ts
type Update<T> = {
  [K in keyof T]?: T[K] | ((prev: T[K]) => T[K]);
};

type User = { name: string; age: number };
type UserUpdate = Update<User>; 
// { name?: string | ((prev: string) => string); age?: number | ((prev: number) => number); }
```

#### Реальные применения:

**API конфигурация:**
```ts
type ApiConfig = {
  baseUrl: string;
  timeout: number;
  retries: number;
};

// Все свойства опциональны для конфигурации по умолчанию
type DefaultConfig = Partial<ApiConfig>;

// Только некоторые свойства могут быть обновлены
type ConfigUpdate = Pick<Partial<ApiConfig>, 'timeout' | 'retries'>;
```

#### Важные моменты:

- Mapped types итерируются по ключам типа
- Можно фильтровать ключи с помощью `as` и conditional types
- Модификаторы `+readonly`, `-readonly`, `+?`, `-?` управляют модификаторами свойств
- Mapped types могут быть рекурсивными для работы с вложенными типами
- Используются в стандартных utility types (Partial, Required, Readonly, Pick, Omit)

---

## 5. Utility Types — Pick, Omit, Partial, Required и создание собственных

### Вопрос
Объясните стандартные utility types TypeScript: `Pick`, `Omit`, `Partial`, `Required`, `Record`, `Exclude`, `Extract`. Как создать собственные utility types для решения конкретных задач?

### Ответ

**Utility Types** — это встроенные типы TypeScript для трансформации других типов. Они построены на conditional и mapped types.

#### Основные utility types:

**1. Partial<T> — делает все свойства опциональными:**

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string; }

// Использование
function updateUser(user: User, updates: Partial<User>) {
  return { ...user, ...updates };
}
```

**2. Required<T> — делает все свойства обязательными:**

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]; // -? удаляет опциональность
};

interface User {
  name: string;
  age?: number;
  email?: string;
}

type RequiredUser = Required<User>;
// { name: string; age: number; email: string; }
```

**3. Readonly<T> — делает все свойства только для чтения:**

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; readonly email: string; }
```

**4. Pick<T, K> — выбирает определенные свойства:**

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

type PublicUser = Pick<User, 'name' | 'email'>;
// { name: string; email: string; }

// Практическое применение
function createPublicProfile(user: User): PublicUser {
  return {
    name: user.name,
    email: user.email
  };
}
```

**5. Omit<T, K> — исключает определенные свойства:**

```ts
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type UserWithoutPassword = Omit<User, 'password'>;
// { name: string; age: number; email: string; }

// Множественное исключение
type UserBasic = Omit<User, 'password' | 'email'>;
// { name: string; age: number; }
```

**6. Record<K, T> — создает объект с ключами K и значениями T:**

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Status = 'pending' | 'approved' | 'rejected';
type StatusConfig = Record<Status, { color: string; message: string }>;

const config: StatusConfig = {
  pending: { color: 'yellow', message: 'Waiting...' },
  approved: { color: 'green', message: 'Approved!' },
  rejected: { color: 'red', message: 'Rejected' }
};
```

**7. Exclude<T, U> — исключает из T все типы, которые есть в U:**

```ts
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>;
// number | boolean

type AllowedStatus = Exclude<'pending' | 'approved' | 'rejected' | 'cancelled', 'cancelled'>;
// 'pending' | 'approved' | 'rejected'
```

**8. Extract<T, U> — извлекает из T только те типы, которые есть в U:**

```ts
type Extract<T, U> = T extends U ? T : never;

type StringOrNumber = Extract<string | number | boolean, string | number>;
// string | number
```

**9. NonNullable<T> — исключает null и undefined:**

```ts
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string
```

**10. ReturnType<T> — извлекает тип возвращаемого значения функции:**

```ts
type ReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => infer R ? R : any;

function getUser() {
  return { name: 'John', age: 30 };
}

type User = ReturnType<typeof getUser>; // { name: string; age: number; }
```

**11. Parameters<T> — извлекает типы параметров функции:**

```ts
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]
```

#### Создание собственных utility types:

**1. DeepPartial — рекурсивный Partial:**
```ts
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Nested = {
  user: {
    name: string;
    settings: {
      theme: string;
    };
  };
};

type PartialNested = DeepPartial<Nested>;
// Все свойства на всех уровнях опциональны
```

**2. DeepRequired — рекурсивный Required:**
```ts
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
```

**3. Nullable — добавляет null к типу:**
```ts
type Nullable<T> = T | null;

type MaybeString = Nullable<string>; // string | null
```

**4. Optional — делает определенные свойства опциональными:**
```ts
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type User = { name: string; age: number; email: string };
type UserWithOptionalAge = Optional<User, 'age'>;
// { name: string; age?: number; email: string; }
```

**5. Values — извлекает типы значений объекта:**
```ts
type Values<T> = T[keyof T];

type User = { name: string; age: number; email: string };
type UserValues = Values<User>; // string | number
```

**6. KeysOfType — выбирает ключи с определенным типом значения:**
```ts
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type User = { name: string; age: number; email: string };
type StringKeys = KeysOfType<User, string>; // 'name' | 'email'
```

**7. Prettify — разворачивает пересеченные типы:**
```ts
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Complex = { a: number } & { b: string } & { c: boolean };
type Pretty = Prettify<Complex>;
// В IDE будет показано как один объект: { a: number; b: string; c: boolean; }
```

**8. Merge — объединяет два типа:**
```ts
type Merge<T, U> = Omit<T, keyof U> & U;

type A = { a: number; b: string };
type B = { b: number; c: boolean };
type Merged = Merge<A, B>; // { a: number; b: number; c: boolean; }
```

#### Практические сценарии:

**API типы:**
```ts
interface ApiUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Для создания не нужны служебные поля
type CreateUserRequest = Omit<ApiUser, 'id' | 'createdAt' | 'updatedAt'>;

// Для обновления все опционально кроме id
type UpdateUserRequest = Partial<Omit<ApiUser, 'id'>> & { id: number };

// Публичный профиль
type PublicUser = Omit<ApiUser, 'email'>;
```

**Формы и валидация:**
```ts
type FormErrors<T> = Partial<Record<keyof T, string>>;

type LoginForm = {
  email: string;
  password: string;
};

type LoginErrors = FormErrors<LoginForm>;
// { email?: string; password?: string; }
```

#### Важные моменты:

- Utility types работают на этапе компиляции
- Можно комбинировать для сложных преобразований
- Некоторые utility types распределяются по union типам
- Создание собственных utility types улучшает переиспользование типов
- Используйте для типобезопасных API и форм

---

## 6. Generics и их ограничения (Constraints)

### Вопрос
Объясните концепцию generics в TypeScript. Что такое constraints (ограничения)? Как использовать `extends` для ограничения generic типов? Приведите примеры сложных generic функций и классов.

### Ответ

**Generics** — это механизм создания переиспользуемых компонентов, которые работают с разными типами, сохраняя при этом информацию о типах.

#### Базовый синтаксис:

```ts
// Функция
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(5);
const str = identity<string>('hello');
const inferred = identity(42); // TypeScript выводит тип автоматически
```

#### Constraints (ограничения):

**1. extends для ограничения типов:**
```ts
// T должен иметь свойство length
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // ✅ OK
logLength([1, 2, 3]); // ✅ OK
// logLength(5); // ❌ Error: number не имеет length
```

**2. Ограничение keyof:**
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'John', age: 30 };
const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age'); // number
// getProperty(user, 'email'); // ❌ Error: 'email' не существует
```

**3. Множественные ограничения:**
```ts
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

function process<T extends HasId & HasName>(item: T): T {
  console.log(item.id, item.name);
  return item;
}

const user = { id: 1, name: 'John', email: 'john@example.com' };
process(user); // ✅ OK
```

#### Сложные примеры:

**1. Generic класс:**
```ts
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const stringContainer = new Container<string>('hello');
const numberContainer = new Container<number>(42);
```

**2. Generic интерфейсы:**
```ts
interface Repository<T> {
  findById(id: number): T | null;
  save(entity: T): T;
  delete(id: number): void;
  findAll(): T[];
}

class UserRepository implements Repository<User> {
  findById(id: number): User | null {
    // implementation
    return null;
  }
  save(entity: User): User {
    return entity;
  }
  delete(id: number): void {}
  findAll(): User[] {
    return [];
  }
}
```

**3. Conditional generics:**
```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function callOrReturn<T>(fnOrValue: T): T extends (...args: any[]) => infer R ? R : T {
  if (typeof fnOrValue === 'function') {
    return (fnOrValue as any)();
  }
  return fnOrValue as any;
}
```

**4. Generic с default типами:**
```ts
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

const response1: ApiResponse<User> = { /* ... */ };
const response2: ApiResponse = { data: 'anything', status: 200, message: 'OK' };
```

**5. Recursive generics:**
```ts
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type Nested = {
  a: number;
  b: {
    c: string;
    d: { e: boolean };
  };
};

type ReadonlyNested = DeepReadonly<Nested>;
```

**6. Generic с условной логикой:**
```ts
function createValue<T extends string | number>(
  value: T
): T extends string ? { type: 'string'; value: string } : { type: 'number'; value: number } {
  if (typeof value === 'string') {
    return { type: 'string', value } as any;
  }
  return { type: 'number', value } as any;
}
```

**7. Mapped generic:**
```ts
type Mapper<T> = {
  [K in keyof T]: (value: T[K]) => T[K];
};

type User = { name: string; age: number };
type UserMapper = Mapper<User>;
// { name: (value: string) => string; age: (value: number) => number; }
```

#### Практические примеры:

**1. API клиент:**
```ts
class ApiClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
  }

  async post<T, R>(url: string, data: T): Promise<R> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

const client = new ApiClient();
const user = await client.get<User>('/api/user/1');
const created = await client.post<CreateUserDto, User>('/api/users', { name: 'John' });
```

**2. Factory паттерн:**
```ts
interface Creator<T> {
  create(): T;
}

class UserCreator implements Creator<User> {
  create(): User {
    return { id: 1, name: 'Default User' };
  }
}

function createFactory<T>(creator: Creator<T>): T {
  return creator.create();
}

const user = createFactory(new UserCreator());
```

**3. Builder паттерн:**
```ts
class QueryBuilder<T> {
  private conditions: Array<(item: T) => boolean> = [];

  where(predicate: (item: T) => boolean): this {
    this.conditions.push(predicate);
    return this;
  }

  execute(items: T[]): T[] {
    return items.filter(item => 
      this.conditions.every(condition => condition(item))
    );
  }
}

const builder = new QueryBuilder<User>();
const results = builder
  .where(u => u.age > 18)
  .where(u => u.name.startsWith('J'))
  .execute(users);
```

**4. Типобезопасный event emitter:**
```ts
type EventMap = {
  click: { x: number; y: number };
  change: { value: string };
  error: Error;
};

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(event: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners[event]?.forEach(handler => handler(data));
  }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.on('click', (data) => {
  console.log(data.x, data.y); // TypeScript знает типы
});
emitter.emit('click', { x: 10, y: 20 });
```

#### Важные моменты:

- Generics обеспечивают переиспользование кода с сохранением типобезопасности
- Constraints (`extends`) ограничивают допустимые типы
- Type inference работает автоматически, но можно указать типы явно
- Generics можно использовать в функциях, классах, интерфейсах и type aliases
- Можно задавать default типы для generics
- Generics работают на этапе компиляции и стираются при компиляции

---

## 7. Template Literal Types и их применение

### Вопрос
Что такое Template Literal Types в TypeScript? Как они работают? Приведите примеры создания типобезопасных строковых паттернов, путей API, CSS классов и других практических применений.

### Ответ

**Template Literal Types** — это типы, построенные на основе template literal синтаксиса (обратные кавычки). Они позволяют создавать типы строк с определенными паттернами.

#### Базовый синтаксис:

```ts
type Greeting = `Hello, ${string}`;

const valid: Greeting = 'Hello, World'; // ✅ OK
const invalid: Greeting = 'Hi, World'; // ❌ Error

// С literal типами
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
```

#### Встроенные utility типы для строк:

```ts
// Uppercase<T> - преобразует все символы в верхний регистр
type Upper = Uppercase<'hello'>; // 'HELLO'

// Lowercase<T> - преобразует все символы в нижний регистр
type Lower = Lowercase<'HELLO'>; // 'hello'

// Capitalize<T> - первый символ в верхний регистр
type Cap = Capitalize<'hello'>; // 'Hello'

// Uncapitalize<T> - первый символ в нижний регистр
type Uncap = Uncapitalize<'Hello'>; // 'hello'
```

#### Практические примеры:

**1. Типобезопасные пути API:**
```ts
type ApiEndpoint = `/api/${string}`;
type UserEndpoint = `/api/users/${number}`;

function fetchUser(id: number): Promise<User> {
  const url: UserEndpoint = `/api/users/${id}`;
  return fetch(url).then(r => r.json());
}

// Более сложный пример с параметрами
type Route = 
  | '/users'
  | `/users/${number}`
  | `/users/${number}/posts`
  | `/posts/${number}`;

function navigate(route: Route) {
  // implementation
}

navigate('/users'); // ✅
navigate('/users/123'); // ✅
navigate('/users/123/posts'); // ✅
// navigate('/invalid'); // ❌ Error
```

**2. Геттеры и сеттеры:**
```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type User = { name: string; age: number };

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }

type UserSetters = Setters<User>;
// { setName: (value: string) => void; setAge: (value: number) => void; }
```

**3. CSS классы с префиксами:**
```ts
type BEMBlock = string;
type BEMModifier = string;

type BEMClass<B extends BEMBlock, M extends BEMModifier> = 
  `${B}--${M}`;

type ButtonModifier = 'primary' | 'secondary' | 'danger';
type ButtonClass = BEMClass<'button', ButtonModifier>;
// 'button--primary' | 'button--secondary' | 'button--danger'

// С элементами
type BEMElement<B extends BEMBlock, E extends string> = 
  `${B}__${E}`;

type ButtonElement = BEMElement<'button', 'icon' | 'text' | 'loader'>;
// 'button__icon' | 'button__text' | 'button__loader'
```

**4. Типобезопасные ID:**
```ts
type EntityId<T extends string> = `${T}_${string}`;

type UserId = EntityId<'user'>; // 'user_...'
type PostId = EntityId<'post'>; // 'post_...'

function getUserById(id: UserId): User {
  // implementation
}

const userId: UserId = 'user_123';
getUserById(userId); // ✅ OK
// getUserById('post_123'); // ❌ Error
```

**5. Event handlers:**
```ts
type EventName = 'click' | 'change' | 'submit';
type EventHandlerName<T extends EventName> = `on${Capitalize<T>}`;

type EventHandlers = {
  [K in EventName]: EventHandlerName<K>;
}[EventName];
// 'onClick' | 'onChange' | 'onSubmit'

// Применение
type ComponentProps = {
  onClick: () => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
};
```

**6. Валидация строковых форматов:**
```ts
type Email = `${string}@${string}.${string}`;
type UUID = `${string}-${string}-${string}-${string}-${string}`;

// Более точный email (упрощенный)
type EmailPattern = `${string}@${string}.${Lowercase<string>}`;

const email: Email = 'user@example.com'; // ✅
// const invalid: Email = 'not-an-email'; // ❌
```

**7. Создание типов для конфигурации:**
```ts
type Env = 'development' | 'staging' | 'production';
type Service = 'api' | 'auth' | 'database';

type ServiceUrl<T extends Service> = `https://${T}.${Env}.example.com`;

type ApiUrl = ServiceUrl<'api'>;
// 'https://api.development.example.com' | 'https://api.staging.example.com' | ...

// С переменными
type ConfigKey<T extends string> = `config.${T}`;
type ThemeKey = ConfigKey<'theme' | 'language'>;
// 'config.theme' | 'config.language'
```

**8. Рекурсивные template literal types:**
```ts
type Path<T extends string> = T | `${T}/${Path<T>}`;

type ApiPath = Path<'api'>;
// 'api' | 'api/api' | 'api/api/api' | ...

// Более полезный пример с ограничениями
type ValidPath = 
  | 'users'
  | `users/${number}`
  | `users/${number}/posts`
  | `posts/${number}`;
```

**9. Типобезопасные SQL запросы (упрощенный пример):**
```ts
type TableName = 'users' | 'posts' | 'comments';
type Column<T extends TableName> = 
  T extends 'users' ? 'id' | 'name' | 'email' :
  T extends 'posts' ? 'id' | 'title' | 'content' :
  'id' | 'text';

type SelectQuery<T extends TableName> = 
  `SELECT ${string} FROM ${T}`;

type WhereClause<T extends TableName> = 
  `WHERE ${Column<T>} = ${string}`;

type Query<T extends TableName> = 
  `${SelectQuery<T>} ${WhereClause<T>}`;

const query: Query<'users'> = 'SELECT * FROM users WHERE id = 1';
```

**10. Сложный пример: создание типов для локализации:**
```ts
type Language = 'en' | 'ru' | 'fr';
type Key = 'greeting' | 'farewell' | 'error';

type LocalizedKey<L extends Language, K extends Key> = 
  `${L}.${K}`;

type LocalizationKeys = 
  LocalizedKey<'en', Key> | 
  LocalizedKey<'ru', Key> | 
  LocalizedKey<'fr', Key>;
// 'en.greeting' | 'en.farewell' | ... | 'ru.greeting' | ...

type LocalizationMap = {
  [K in LocalizationKeys]: string;
};

const translations: LocalizationMap = {
  'en.greeting': 'Hello',
  'en.farewell': 'Goodbye',
  'ru.greeting': 'Привет',
  'ru.farewell': 'До свидания',
  // ...
};
```

#### Инференс с template literal types:

```ts
type ExtractId<T extends string> = 
  T extends `${infer Prefix}_${infer Id}` ? Id : never;

type UserId = ExtractId<'user_123'>; // '123'
type PostId = ExtractId<'post_456'>; // '456'

// Извлечение параметров из пути
type ExtractParams<T extends string> = 
  T extends `/users/${infer Id}` ? Id : never;

type Param = ExtractParams<'/users/123'>; // '123'
```

#### Важные моменты:

- Template literal types работают только со string literal типами
- Можно комбинировать с conditional types и mapped types
- Встроенные utility типы (Uppercase, Lowercase, Capitalize, Uncapitalize) помогают трансформировать строки
- Используются для создания типобезопасных API, путей, ID, конфигураций
- Можно извлекать части строк с помощью `infer` в conditional types
- Очень полезны для создания DSL (Domain Specific Languages) на уровне типов

---

## 8. Type Narrowing (сужение типов) и его механизмы

### Вопрос
Что такое type narrowing в TypeScript? Какие механизмы используются для сужения типов? Объясните разницу между type guards, assertion functions, discriminated unions и control flow analysis.

### Ответ

**Type Narrowing** — это процесс, при котором TypeScript определяет более специфичный тип значения внутри определенной области видимости на основе проверок и анализа потока управления.

#### Механизмы type narrowing:

**1. typeof guards:**
```ts
function process(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript знает, что здесь value - string
    console.log(value.toUpperCase());
  } else {
    // TypeScript знает, что здесь value - number
    console.log(value.toFixed(2));
  }
}
```

**2. instanceof guards:**
```ts
class Dog {
  bark() {
    console.log('Woof!');
  }
}

class Cat {
  meow() {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript знает, что это Dog
  } else {
    animal.meow(); // TypeScript знает, что это Cat
  }
}
```

**3. in operator:**
```ts
type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish) {
  if ('fly' in animal) {
    animal.fly(); // TypeScript знает, что это Bird
  } else {
    animal.swim(); // TypeScript знает, что это Fish
  }
}
```

**4. Equality narrowing:**
```ts
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Если x === y, то оба должны быть string
    console.log(x.toUpperCase()); // ✅ OK
    console.log(y.toUpperCase()); // ✅ OK
  }
}
```

**5. Truthiness narrowing:**
```ts
function print(str: string | null | undefined) {
  if (str) {
    // TypeScript знает, что str не null и не undefined
    console.log(str.length);
  }
  
  // Или с явной проверкой
  if (str !== null && str !== undefined) {
    console.log(str.length);
  }
}
```

**6. Custom type guards:**
```ts
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // ✅ TypeScript знает, что это string
  }
}

// Более сложный пример
interface User {
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).email === 'string'
  );
}

function handleUser(data: unknown) {
  if (isUser(data)) {
    console.log(data.name, data.email); // ✅ Безопасно
  }
}
```

**7. Discriminated unions (различимые объединения):**
```ts
type Success<T> = { 
  success: true; 
  data: T;
};

type Failure = { 
  success: false; 
  error: string;
};

type Result<T> = Success<T> | Failure;

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript знает, что это Success<T>
    console.log(result.data);
  } else {
    // TypeScript знает, что это Failure
    console.log(result.error);
  }
}
```

**8. Assertion functions:**
```ts
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Expected string');
  }
}

function process(value: unknown) {
  assertIsString(value);
  // После assert TypeScript знает, что value - string
  console.log(value.toUpperCase()); // ✅ OK
}

// Assertion function с условием
function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
}

function example(x: string | null) {
  assertIsDefined(x);
  console.log(x.length); // ✅ OK, TypeScript знает, что x - string
}
```

**9. Control flow analysis:**
```ts
function example(value: string | number) {
  if (typeof value === 'string') {
    return; // Early return
  }
  // TypeScript знает, что здесь value - number
  console.log(value.toFixed(2)); // ✅ OK
}

// С switch
function getArea(shape: Circle | Square): number {
  switch (shape.kind) {
    case 'circle':
      // TypeScript знает, что это Circle
      return Math.PI * shape.radius ** 2;
    case 'square':
      // TypeScript знает, что это Square
      return shape.side ** 2;
  }
}
```

**10. Array narrowing:**
```ts
function processArray(arr: (string | number)[]) {
  const strings = arr.filter((item): item is string => 
    typeof item === 'string'
  );
  // strings имеет тип string[]
  strings.forEach(s => console.log(s.toUpperCase()));
}
```

#### Сложные примеры:

**1. Комбинирование нескольких narrowing:**
```ts
type ApiResponse = 
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: string };

function handleResponse(response: ApiResponse) {
  switch (response.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      // TypeScript знает, что это { status: 'success'; data: User }
      return response.data.name;
    case 'error':
      // TypeScript знает, что это { status: 'error'; error: string }
      return response.error;
  }
}
```

**2. Рекурсивное narrowing:**
```ts
type JsonValue = 
  | string 
  | number 
  | boolean 
  | null 
  | JsonValue[] 
  | { [key: string]: JsonValue };

function stringify(value: JsonValue): string {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    // TypeScript знает, что это JsonValue[]
    return `[${value.map(stringify).join(',')}]`;
  }
  // TypeScript знает, что это объект
  const entries = Object.entries(value);
  return `{${entries.map(([k, v]) => `"${k}":${stringify(v)}`).join(',')}}`;
}
```

**3. Narrowing с generic types:**
```ts
function isArrayOf<T>(
  arr: unknown[],
  guard: (item: unknown) => item is T
): arr is T[] {
  return arr.every(guard);
}

function processNumbers(data: unknown) {
  if (Array.isArray(data) && isArrayOf(data, (x): x is number => typeof x === 'number')) {
    // TypeScript знает, что data - number[]
    const sum = data.reduce((a, b) => a + b, 0);
    return sum;
  }
  throw new Error('Expected array of numbers');
}
```

#### Проблемы и решения:

**1. Модификация объектов в условиях:**
```ts
function example(obj: { value?: string }) {
  if (obj.value) {
    // TypeScript знает, что obj.value - string
    console.log(obj.value.length);
    
    obj.value = undefined; // Меняем значение
    console.log(obj.value.length); // ❌ Error! TypeScript не видит изменения
  }
}
```

**2. Массивы и narrowing:**
```ts
const arr: (string | number)[] = ['hello', 42, 'world'];

// filter не сужает тип автоматически
const strings = arr.filter(item => typeof item === 'string');
// strings все еще (string | number)[]

// Нужен type guard
const strings2 = arr.filter((item): item is string => 
  typeof item === 'string'
);
// strings2 теперь string[]
```

#### Важные моменты:

- Type narrowing происходит автоматически на основе проверок
- Type guards возвращают `value is Type` для явного сужения
- Assertion functions используют `asserts value is Type` для гарантий
- Discriminated unions — мощный паттерн для типобезопасных состояний
- Control flow analysis учитывает все ветки выполнения
- Type narrowing работает локально в области видимости

---

## 9. Distributive Conditional Types и их поведение

### Вопрос
Что такое distributive conditional types в TypeScript? Как они работают с union типами? Когда распределение происходит, а когда нет? Как предотвратить распределение? Приведите примеры.

### Ответ

**Distributive Conditional Types** — это особенность conditional types, при которой они автоматически распределяются по каждому члену union типа при применении к union.

#### Как работает распределение:

Когда conditional type `T extends U ? X : Y` применяется к union типу `A | B`, он распределяется как `(A extends U ? X : Y) | (B extends U ? X : Y)`.

#### Примеры распределения:

**1. Базовое распределение:**
```ts
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Распадается на: (string extends any ? string[] : never) | (number extends any ? number[] : never)
// Результат: string[] | number[]
// НЕ (string | number)[]

const arr1: StrOrNumArray = ['hello']; // ✅ string[]
const arr2: StrOrNumArray = [42]; // ✅ number[]
// const arr3: StrOrNumArray = ['hello', 42]; // ❌ Error: не string[] и не number[]
```

**2. Условное распределение:**
```ts
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>;
// Распадается на:
// (string extends string ? never : string) |
// (number extends string ? never : number) |
// (boolean extends string ? never : boolean)
// Результат: never | number | boolean = number | boolean
```

**3. Extract (противоположность Exclude):**
```ts
type Extract<T, U> = T extends U ? T : never;

type StringOrNumber = Extract<string | number | boolean, string | number>;
// Распадается на:
// (string extends string | number ? string : never) |
// (number extends string | number ? number : never) |
// (boolean extends string | number ? boolean : never)
// Результат: string | number | never = string | number
```

#### Когда распределение НЕ происходит:

**1. С помощью кортежей (tuples):**
```ts
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArray2 = ToArrayNonDist<string | number>;
// Не распределяется, потому что проверяется [string | number] extends [any]
// Результат: (string | number)[]

const arr: StrOrNumArray2 = ['hello', 42]; // ✅ OK
```

**2. Когда проверяется структура, а не сам тип:**
```ts
type NonDist<T> = T extends any[] ? T : never;

type Test1 = NonDist<string[] | number[]>;
// Распределяется: string[] | number[]

type NonDist2<T> = [T] extends [any[]] ? T : never;

type Test2 = NonDist2<string[] | number[]>;
// Не распределяется: never (потому что [string[] | number[]] не extends [any[]])
```

**3. С never:**
```ts
type Test<T> = T extends any ? T[] : never;

type WithNever = Test<string | never>;
// Результат: string[] (never игнорируется в union)
```

#### Практические примеры:

**1. Утилита для обработки union типов:**
```ts
// Распределительный вариант - обрабатывает каждый тип отдельно
type MapToArray<T> = T extends any ? T[] : never;

type Result1 = MapToArray<string | number>; 
// string[] | number[]

// Нераспределительный вариант - обрабатывает union как целое
type MapToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Result2 = MapToArrayNonDist<string | number>; 
// (string | number)[]
```

**2. Условное исключение из union:**
```ts
// Удаление определенных типов
type RemoveFromUnion<T, U> = T extends U ? never : T;

type WithoutNull = RemoveFromUnion<string | number | null, null>;
// string | number

// Удаление нескольких типов
type Primitive = string | number | boolean;
type WithoutPrimitives<T> = T extends Primitive ? never : T;

type Test = WithoutPrimitives<string | object | number>;
// object
```

**3. Преобразование union в intersection:**
```ts
type UnionToIntersection<U> = 
  (U extends any ? (x: U) => void : never) extends (x: infer I) => void 
    ? I 
    : never;

type Example = UnionToIntersection<{ a: string } | { b: number }>;
// { a: string } & { b: number }
// = { a: string; b: number }
```

**4. Получение последнего типа в union:**
```ts
type LastOfUnion<T> = 
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R 
    ? R 
    : never;

type Last = LastOfUnion<1 | 2 | 3>; // 3
```

**5. Преобразование union в tuple:**
```ts
type UnionToTuple<T> = 
  UnionToIntersection<T extends any ? () => T : never> extends infer U
    ? U extends () => infer R
      ? [...UnionToTuple<Exclude<T, R>>, R]
      : []
    : [];

type Tuple = UnionToTuple<'a' | 'b' | 'c'>;
// ['a', 'b', 'c'] (порядок может отличаться)
```

**6. Проверка, является ли тип union:**
```ts
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type Test1 = IsUnion<string | number>; // true
type Test2 = IsUnion<string>; // false
```

#### Полезные паттерны:

**1. Условная обработка union:**
```ts
type ProcessUnion<T> = T extends string
  ? `String: ${T}`
  : T extends number
  ? `Number: ${T}`
  : never;

type Processed = ProcessUnion<'hello' | 42 | true>;
// 'String: hello' | 'Number: 42' | never
// = 'String: hello' | 'Number: 42'
```

**2. Создание mapped type из union:**
```ts
type UnionToRecord<T extends string | number | symbol> = {
  [K in T]: K;
};

type Keys = 'a' | 'b' | 'c';
type RecordFromUnion = UnionToRecord<Keys>;
// { a: 'a'; b: 'b'; c: 'c'; }
```

**3. Фильтрация union по условию:**
```ts
type FilterUnion<T, U> = T extends U ? T : never;

type Numbers = FilterUnion<string | number | boolean, number>;
// number

// Обратное - исключение типов
type ExcludeFromUnion<T, U> = T extends U ? never : T;
```

#### Когда использовать каждый подход:

**Используйте распределительный подход когда:**
- Нужно обработать каждый тип в union отдельно
- Создаете утилиты типа Exclude, Extract
- Нужно применить преобразование к каждому члену union

**Предотвращайте распределение когда:**
- Нужно обработать union как единое целое
- Создаете массивы или кортежи из union
- Проверяете структуру union целиком

#### Важные моменты:

- Распределение происходит только когда проверяется `T extends U`, где T - type parameter
- Распределение не происходит, если T уже не type parameter (например, конкретный тип)
- Можно предотвратить распределение, обернув в кортеж: `[T] extends [U]`
- `never` автоматически удаляется из union
- Распределительные conditional types очень полезны для создания utility types
- Понимание распределения критично для работы с продвинутыми типами TypeScript

---

## 10. Branded Types и Nominal Typing в TypeScript

### Вопрос
Что такое branded types (брендированные типы) и nominal typing в TypeScript? Зачем они нужны, если TypeScript использует структурную типизацию? Как создать branded types? Приведите практические примеры использования.

### Ответ

**Branded Types** (брендированные типы) — это способ создания номинальной типизации в структурно типизированном TypeScript. Они позволяют различать типы, которые структурно одинаковы, но семантически различны.

**Проблема структурной типизации:**
TypeScript использует структурную типизацию (duck typing), что означает, что два типа совместимы, если они имеют одинаковую структуру, даже если они семантически различны.

```ts
type UserId = number;
type ProductId = number;

function getUser(id: UserId): User {
  // ...
}

const productId: ProductId = 123;
getUser(productId); // ✅ TypeScript позволяет, но это ошибка логики!
```

#### Создание Branded Types:

**1. Базовый подход с unique symbol:**
```ts
// Брендированные типы с unique symbol
declare const UserIdBrand: unique symbol;
declare const ProductIdBrand: unique symbol;

type UserId = number & { readonly [UserIdBrand]: true };
type ProductId = number & { readonly [ProductIdBrand]: true };

function createUserId(id: number): UserId {
  return id as UserId;
}

function createProductId(id: number): ProductId {
  return id as ProductId;
}

function getUser(id: UserId): User {
  // implementation
  return {} as User;
}

const userId = createUserId(123);
const productId = createProductId(123);

getUser(userId); // ✅ OK
// getUser(productId); // ❌ Error: Type 'ProductId' is not assignable to type 'UserId'
```

**2. Универсальный helper:**
```ts
type Brand<T, B> = T & { readonly __brand: B };

type UserId = Brand<number, 'UserId'>;
type ProductId = Brand<number, 'ProductId'>;
type Email = Brand<string, 'Email'>;

function createUserId(id: number): UserId {
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  return email as Email;
}

function sendEmail(to: Email, subject: string) {
  // implementation
}

const email = createEmail('user@example.com');
// const invalid = createEmail('not-an-email'); // Runtime error

sendEmail(email, 'Hello'); // ✅ OK
// sendEmail('user@example.com', 'Hello'); // ❌ Error: expected Email branded type
```

**3. С несколькими брендами:**
```ts
type Brand<T, B extends string> = T & { readonly [K in B]: true };

type UserId = Brand<number, 'UserId'>;
type AdminId = Brand<number, 'UserId' | 'AdminId'>; // Можно комбинировать

// Или более строгий подход
type Brand<T, B> = T & { readonly __brand: B };
type MultiBrand<T, B1, B2> = Brand<Brand<T, B1>, B2>;
```

#### Практические примеры:

**1. ID типы для разных сущностей:**
```ts
type Brand<T, B> = T & { readonly __brand: B };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;
type CommentId = Brand<string, 'CommentId'>;

class UserService {
  getUser(id: UserId): Promise<User> {
    // Можно быть уверенным, что это именно UserId
    return fetch(`/api/users/${id}`).then(r => r.json());
  }
  
  getPost(id: PostId): Promise<Post> {
    return fetch(`/api/posts/${id}`).then(r => r.json());
  }
}

const userId: UserId = 'user-123' as UserId;
const postId: PostId = 'post-456' as PostId;

const service = new UserService();
service.getUser(userId); // ✅ OK
// service.getUser(postId); // ❌ Error
```

**2. Email и другие строковые типы:**
```ts
type Email = Brand<string, 'Email'>;
type URL = Brand<string, 'URL'>;
type HTML = Brand<string, 'HTML'>;

function createEmail(value: string): Email {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error('Invalid email format');
  }
  return value as Email;
}

function createURL(value: string): URL {
  try {
    new globalThis.URL(value);
    return value as URL;
  } catch {
    throw new Error('Invalid URL');
  }
}

function sendEmail(to: Email, body: HTML) {
  // implementation
}

const email = createEmail('user@example.com');
const url = createURL('https://example.com');

// sendEmail(url, 'body'); // ❌ Error: URL не может быть использован как Email
```

**3. Единицы измерения:**
```ts
type Brand<T, B> = T & { readonly __brand: B };

type Meters = Brand<number, 'Meters'>;
type Kilometers = Brand<number, 'Kilometers'>;
type Miles = Brand<number, 'Miles'>;

function createMeters(value: number): Meters {
  return value as Meters;
}

function createKilometers(value: number): Kilometers {
  return value as Kilometers;
}

function metersToKilometers(m: Meters): Kilometers {
  return (m / 1000) as Kilometers;
}

function addMeters(a: Meters, b: Meters): Meters {
  return (a + b) as Meters;
}

const distance1 = createMeters(1000);
const distance2 = createMeters(500);
const sum = addMeters(distance1, distance2); // ✅ OK

const km = createKilometers(1);
// const sum2 = addMeters(distance1, km); // ❌ Error: нельзя смешивать метры и километры
```

**4. Валидированные данные:**
```ts
type Validated<T> = Brand<T, 'Validated'>;

type ValidatedUser = Validated<{
  name: string;
  email: string;
  age: number;
}>;

function validateUser(user: { name: string; email: string; age: number }): ValidatedUser {
  if (!user.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (user.age < 0) {
    throw new Error('Invalid age');
  }
  return user as ValidatedUser;
}

function processUser(user: ValidatedUser) {
  // Можно быть уверенным, что данные валидны
  console.log(`Processing ${user.name}`);
}

const rawUser = { name: 'John', email: 'john@example.com', age: 30 };
const validated = validateUser(rawUser);
processUser(validated); // ✅ OK
// processUser(rawUser); // ❌ Error: ожидается ValidatedUser
```

**5. Non-empty массивы и строки:**
```ts
type NonEmptyString = Brand<string, 'NonEmptyString'>;
type NonEmptyArray<T> = Brand<T[], 'NonEmptyArray'>;

function createNonEmptyString(value: string): NonEmptyString {
  if (value.length === 0) {
    throw new Error('String cannot be empty');
  }
  return value as NonEmptyString;
}

function getFirst<T>(arr: NonEmptyArray<T>): T {
  return arr[0]; // Безопасно, так как массив точно не пустой
}

const str = createNonEmptyString('hello');
const arr: NonEmptyArray<number> = [1, 2, 3] as NonEmptyArray<number>;
const first = getFirst(arr); // ✅ OK, тип number
```

**6. Timestamp и Date:**
```ts
type UnixTimestamp = Brand<number, 'UnixTimestamp'>;
type ISODateString = Brand<string, 'ISODateString'>;

function createTimestamp(value: number): UnixTimestamp {
  if (value < 0) {
    throw new Error('Invalid timestamp');
  }
  return value as UnixTimestamp;
}

function timestampToISO(timestamp: UnixTimestamp): ISODateString {
  return new Date(timestamp).toISOString() as ISODateString;
}

function parseISO(iso: ISODateString): UnixTimestamp {
  return Math.floor(new Date(iso).getTime() / 1000) as UnixTimestamp;
}
```

**7. API версии и эндпоинты:**
```ts
type ApiVersion = Brand<string, 'ApiVersion'>;
type Endpoint = Brand<string, 'Endpoint'>;

const v1: ApiVersion = 'v1' as ApiVersion;
const v2: ApiVersion = 'v2' as ApiVersion;

function createEndpoint(version: ApiVersion, path: string): Endpoint {
  return `/api/${version}${path}` as Endpoint;
}

function makeRequest(endpoint: Endpoint) {
  // Можно быть уверенным, что endpoint правильно сформирован
  return fetch(endpoint);
}

const endpoint = createEndpoint(v1, '/users');
makeRequest(endpoint); // ✅ OK
// makeRequest('/api/v1/users'); // ❌ Error: нужен брендированный Endpoint
```

#### Расширенные техники:

**1. Opaque types (еще более строгие):**
```ts
// Opaque type - бренд не экспортируется, нельзя создать напрямую
declare const OpaqueUserId: unique symbol;

export type UserId = number & { readonly [OpaqueUserId]: true };

// Фабричная функция - единственный способ создания
export function createUserId(id: number): UserId {
  if (id <= 0) {
    throw new Error('Invalid user ID');
  }
  return id as UserId;
}

// Снаружи модуля невозможно создать UserId напрямую
```

**2. Комбинирование с другими типами:**
```ts
type Brand<T, B> = T & { readonly __brand: B };

type PositiveNumber = Brand<number, 'PositiveNumber'>;
type Integer = Brand<number, 'Integer'>;
type PositiveInteger = Brand<PositiveNumber, 'Integer'>; // Комбинация

function createPositiveInteger(value: number): PositiveInteger {
  if (value <= 0 || !Number.isInteger(value)) {
    throw new Error('Must be positive integer');
  }
  return value as PositiveInteger;
}
```

#### Важные моменты:

- Branded types добавляют метку типа без изменения структуры
- Предотвращают случайное смешивание семантически разных типов
- Не добавляют overhead во время выполнения (это compile-time фича)
- Создаются через type assertions, поэтому нужны фабричные функции для валидации
- Особенно полезны для ID, единиц измерения, валидированных данных
- `unique symbol` более строгий, чем строковый бренд
- Opaque types еще строже - бренд не экспортируется

---

## Заключение

Эти 10 вопросов покрывают продвинутые темы TypeScript уровня Middle+, которые часто встречаются на технических собеседованиях. Понимание этих концепций критично для создания типобезопасных и поддерживаемых приложений на TypeScript.

Для углубленного изучения рекомендуется:
- Практиковаться с примерами кода
- Изучать стандартные utility types из библиотеки TypeScript
- Экспериментировать с созданием собственных сложных типов
- Читать исходный код популярных библиотек, использующих TypeScript

---

## Заключение

Эти 6 вопросов покрывают ключевые темы JavaScript уровня Middle, которые часто встречаются на технических собеседованиях. Понимание этих концепций критично для эффективной разработки на JavaScript.

Для углубленного изучения рекомендуется:
- Практиковаться с примерами кода
- Изучать спецификацию ECMAScript
- Решать практические задачи
- Читать исходный код популярных библиотек
