# Пример на методы класса

```js
function Cat() {
  this.name = 'Car';

  this.arr = () => {
    console.log('arr', this.name);
  };

  this.nonarr = function () {
    console.log('nonarr', this.name);
  };
}

const cat = new Cat();

cat.arr(); // cat
cat.nonarr(); // cat

const { arr, nonarr } = cat;

arr(); // cat
nonarr(); // undefined
```

## Пример на наследование в классах

> Тут важно вот что

- super вызывается с методами наследуемого класса, но с контекстом своим !
- после смены контекста в наследуемом классе super.method вызывается со своими методами и так же новым контекстом

```js
class Pro {
  constructor() {
    this.id = 'pro';
    this.print();
  }

  print() {
    console.log('pro', this.id);
  }
}

class Base extends Pro {
  constructor() {
    // тут методы будут переопределеные на дочерние от Base
    // Но данные еще от Pro
    super();
    this.id = 'base';
    this.print();
    super.print();
  }

  print() {
    console.log('base', this.id);
  }
}

new Base();
// base pro
// base base
// pro base
```

## instanceof

Оператор instanceof проверяет, появляется ли свойство прототипа конструктора где-либо в цепочке прототипов объекта.

Это означает, что мы можем использовать его, чтобы проверить, является ли объект конструктором из данного класса или функции-конструктора.

Он возвращает true, если объект является экземпляром класса или функции-конструктора, и false в противном случае.
