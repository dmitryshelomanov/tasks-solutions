# Объекты в JavaScript

## Введение

Объекты в JavaScript — это фундаментальная структура данных, которая используется для хранения коллекций связанных данных и функций. Понимание того, как работают объекты, критично для эффективной работы с JavaScript.

---

## Ссылочная природа объектов

Все объекты в JavaScript (включая массивы, функции, даты и обычные объекты) являются **ссылочными типами данных**. Это означает, что переменная хранит не сам объект, а **ссылку на область памяти**, где он находится.

### Примитивы vs Объекты

- **Примитивы** (number, string, boolean, null, undefined, symbol, bigint) — передаются по значению
- **Объекты** (object, array, function, date, etc.) — передаются по ссылке

### Пример: объекты передаются по ссылке

```javascript
let obj = { a: 1 };
let array = [obj];

obj = null;
console.log(array); // [ { a: 1 } ]
```

> **Важно**: В этом примере видно, что `obj` — это просто ссылка на место в памяти. Когда мы присваиваем `obj = null`, мы только удаляем ссылку, но сам объект остаётся в памяти, так как на него всё ещё ссылается массив `array`.

---

## Копирование объектов

### Поверхностное копирование (Shallow Copy)

При поверхностном копировании создаётся новый объект, но вложенные объекты копируются по ссылке.

```javascript
const original = { a: 1, b: { c: 2 } };

// Метод 1: Object.assign()
const copy1 = Object.assign({}, original);

// Метод 2: Spread operator
const copy2 = { ...original };

// Изменение вложенного объекта влияет на оба
copy1.b.c = 3;
console.log(original.b.c); // 3 (изменилось!)
```

### Глубокое копирование (Deep Copy)

Глубокое копирование создаёт полностью независимую копию объекта и всех вложенных объектов.

```javascript
const original = { a: 1, b: { c: 2 } };

// Метод 1: JSON (работает только с простыми типами)
const copy1 = JSON.parse(JSON.stringify(original));

// Метод 2: Structured cloning (современный способ)
const copy2 = structuredClone(original);

// Метод 3: Рекурсивная функция
function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepCopy(item));
  }
  
  const copy = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  
  return copy;
}

const copy3 = deepCopy(original);
```

---

## Сравнение объектов

Объекты сравниваются по ссылке, а не по содержимому.

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 === obj2); // false (разные ссылки)
console.log(obj1 === obj3); // true (одна и та же ссылка)

// Для сравнения содержимого нужно использовать специальные методы
function shallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

console.log(shallowEqual(obj1, obj2)); // true
```

---

## Мутация объектов

Мутация (изменение) объекта может влиять на все переменные, которые ссылаются на этот объект.

```javascript
const person = { name: 'John', age: 30 };
const anotherPerson = person;

anotherPerson.age = 31;

console.log(person.age); // 31 (изменилось!)
console.log(anotherPerson.age); // 31

// Использование Object.freeze() для предотвращения мутаций
const frozen = Object.freeze({ name: 'Jane', age: 25 });
frozen.age = 26; // Не работает в strict mode
console.log(frozen.age); // 25 (не изменилось)
```

---

## Деструктуризация объектов

Деструктуризация позволяет извлекать свойства объектов в отдельные переменные.

```javascript
const person = { name: 'John', age: 30, city: 'New York' };

// Базовый синтаксис
const { name, age } = person;
console.log(name); // 'John'
console.log(age); // 30

// С переименованием
const { name: personName, age: personAge } = person;

// Со значениями по умолчанию
const { name, age, country = 'USA' } = person;

// Вложенная деструктуризация
const user = {
  id: 1,
  profile: {
    name: 'John',
    email: 'john@example.com'
  }
};

const { profile: { name, email } } = user;

// Остальные свойства
const { name, ...rest } = person;
console.log(rest); // { age: 30, city: 'New York' }
```

---

## Методы работы с объектами

### Object.keys()

Возвращает массив ключей объекта.

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // ['a', 'b', 'c']
```

### Object.values()

Возвращает массив значений объекта.

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.values(obj)); // [1, 2, 3]
```

### Object.entries()

Возвращает массив пар [ключ, значение].

```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj)); // [['a', 1], ['b', 2], ['c', 3]]

// Полезно для итерации
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

### Object.assign()

Копирует свойства из одного или нескольких объектов в целевой объект.

```javascript
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // { a: 1, b: 2, c: 3 }
```

### Object.hasOwnProperty()

Проверяет, есть ли у объекта собственное (не унаследованное) свойство.

```javascript
const obj = { a: 1 };

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('toString')); // false (наследуется)
```

---

## Важные замечания

1. **Объекты передаются по ссылке** — изменения видны во всех переменных
2. **Используйте копирование** когда нужно создать независимую копию
3. **Глубокое копирование** важно для вложенных структур
4. **Деструктуризация** упрощает работу с объектами
5. **Object.freeze()** может помочь предотвратить случайные мутации

---

*Для понимания прототипного наследования см. [__proto__.md](./__proto__.md)*
*Для работы с классами см. [class-methods.md](./class-methods.md)*