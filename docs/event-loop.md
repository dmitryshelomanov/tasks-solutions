# ивент луп примеры

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

// 1 9 2 7 3 8 4 5
```

Тут по очередно из каждого метода идет регистрация в очередь колбеков
