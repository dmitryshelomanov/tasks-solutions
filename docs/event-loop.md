# Event Loop в JavaScript

## Что такое Event Loop?

Event Loop (цикл событий) — это механизм, который позволяет JavaScript выполнять асинхронные операции, несмотря на то, что сам язык является однопоточным. Event Loop управляет выполнением кода, сбором и обработкой событий, выполнением подзадач очереди.

## Пример работы Event Loop

В этом примере показано, как промисы, finally, catch и микротаски добавляются в очередь выполнения:

```js
Promise.resolve()
  .then(() => console.log(1))
  .then(() => console.log(2))
  .finally(() => console.log(3))
  .then(() => console.log(4))
  .finally(() => console.log(5));

queueMicrotask(() => console.log(9));

Promise.reject()
  .then(() => console.log(6))
  .catch(() => console.log(7))
  .then(() => console.log(8));

// Вывод: 1 9 2 7 3 8 4 5
```

## Объяснение

Тут последовательно из каждого метода идет регистрация в очередь колбеков:

1. **Promise.resolve()** создаёт успешно выполненный промис
2. Каждый `.then()` и `.finally()` добавляет обработчик в очередь микротасков
3. **queueMicrotask()** добавляет задачу в очередь микротасков с высоким приоритетом
4. **Promise.reject()** создаёт отклонённый промис
5. `.catch()` обрабатывает ошибку и добавляет следующий `.then()` в очередь

Микротаски выполняются до следующего тика Event Loop, поэтому они имеют приоритет над обычными задачами.

---

## Как работает Event Loop

### Очереди выполнения

Event Loop управляет несколькими очередями:

1. **Call Stack (Стек вызовов)** — выполняет синхронный код
2. **Microtask Queue (Очередь микротасков)** — промисы, queueMicrotask
3. **Macrotask Queue (Очередь макротасков)** — setTimeout, setInterval, события

### Порядок выполнения

```
1. Выполняется весь синхронный код из Call Stack
2. Выполняются ВСЕ микротаски из Microtask Queue
3. Выполняется одна макротаска из Macrotask Queue
4. Снова выполняются ВСЕ микротаски
5. Повторяется цикл
```

### Пример: приоритет микротасков

```javascript
console.log('1. Синхронный код');

setTimeout(() => console.log('2. setTimeout'), 0);

Promise.resolve().then(() => console.log('3. Promise'));

queueMicrotask(() => console.log('4. queueMicrotask'));

console.log('5. Синхронный код');

// Вывод:
// 1. Синхронный код
// 5. Синхронный код
// 3. Promise
// 4. queueMicrotask
// 2. setTimeout
```

---

## Дополнительные примеры

### Пример с async/await

```javascript
async function asyncExample() {
  console.log('1. Начало async функции');
  
  await Promise.resolve();
  
  console.log('2. После await');
}

console.log('3. До вызова');
asyncExample();
console.log('4. После вызова');

// Вывод:
// 3. До вызова
// 1. Начало async функции
// 4. После вызова
// 2. После await
```

### Пример с несколькими промисами

```javascript
Promise.resolve()
  .then(() => {
    console.log('A');
    return Promise.resolve();
  })
  .then(() => {
    console.log('B');
  });

Promise.resolve()
  .then(() => {
    console.log('C');
  })
  .then(() => {
    console.log('D');
  });

// Вывод: A C B D
// Все .then() из первого промиса выполняются вместе,
// затем все .then() из второго промиса
```

### Пример с finally

```javascript
Promise.resolve('success')
  .then(value => {
    console.log('then:', value);
    return value;
  })
  .finally(() => {
    console.log('finally');
  })
  .then(value => {
    console.log('then after finally:', value);
  });

// Вывод:
// then: success
// finally
// then after finally: success
```

---

## Важные замечания

1. **Микротаски имеют приоритет** — все микротаски выполняются перед макротасками
2. **finally всегда выполняется** — независимо от успеха или ошибки
3. **await разворачивает промисы** — код после await попадает в очередь микротасков
4. **setTimeout с 0** — не гарантирует немедленное выполнение, только после всех микротасков

---

*Для понимания контекста и области видимости см. [Ctx-scope-vars.md](./Ctx-scope-vars.md)*
