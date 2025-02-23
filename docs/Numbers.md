# Бинарные числа

Binary number syntax uses a leading zero followed by a lowercase or uppercase Latin letter "B" (0b or 0B).
If the digits after the 0b are not 0 or 1, the following SyntaxError is thrown: "Missing binary digits after 0b".

## Как сложить ? 

BigInt(b1) + BigInt(b2) + .toString(2) если нужно привести в двоичную систему


## Пример

```js
(25).toString(2) // '11001'

new BigInt('0b11001') + new BigInt('0b11001') // '50n'

(BigInt('0b11001') + BigInt('0b11001')).toString(10) // 50
```
