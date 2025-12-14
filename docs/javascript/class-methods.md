# Методы классов в JavaScript

## Введение

В JavaScript методы классов могут быть определены как обычные функции или стрелочные функции. Понимание различий между ними критично для правильной работы с контекстом `this` и наследованием.

---

## Стрелочные функции vs обычные функции в методах

### Основное отличие

- **Стрелочные функции** — наследуют `this` из окружающего контекста (лексический `this`)
- **Обычные функции** — имеют свой собственный `this`, который зависит от способа вызова

### Пример: поведение this

```javascript
function Cat() {
  this.name = 'Cat';

  // Стрелочная функция - this привязан к экземпляру Cat
  this.arrowMethod = () => {
    console.log('arrowMethod', this.name);
  };

  // Обычная функция - this зависит от способа вызова
  this.regularMethod = function() {
    console.log('regularMethod', this.name);
  };
}

const cat = new Cat();

// При прямом вызове оба работают одинаково
cat.arrowMethod();   // arrowMethod Cat
cat.regularMethod(); // regularMethod Cat

// Но при деструктуризации поведение отличается
const { arrowMethod, regularMethod } = cat;

arrowMethod();   // arrowMethod Cat (this сохранён)
regularMethod(); // regularMethod undefined (this потерян)
```

### Почему так происходит?

1. **Стрелочная функция** создаётся один раз при создании объекта и "запоминает" `this` на момент создания
2. **Обычная функция** получает `this` во время вызова, поэтому при отдельном вызове теряет контекст

---

## Пример с обработчиками событий

```javascript
class Button {
  constructor(name) {
    this.name = name;
    this.clickCount = 0;
  }

  // Стрелочная функция - this всегда указывает на экземпляр
  handleClickArrow = () => {
    this.clickCount++;
    console.log(`${this.name} clicked ${this.clickCount} times`);
  }

  // Обычная функция - this зависит от контекста вызова
  handleClickRegular() {
    this.clickCount++;
    console.log(`${this.name} clicked ${this.clickCount} times`);
  }
}

const button = new Button('MyButton');

// В обработчике событий
document.addEventListener('click', button.handleClickArrow);   // Работает
document.addEventListener('click', button.handleClickRegular); // Не работает (this = document)

// Решение для обычной функции - bind
document.addEventListener('click', button.handleClickRegular.bind(button)); // Работает
```

---

## Наследование в классах

### Ключевые моменты

При наследовании классов важно понимать:

1. **super вызывается с методами родительского класса, но с контекстом дочернего класса**
2. **После изменения контекста в дочернем классе `super.method()` вызывает метод родителя, но с новым контекстом дочернего класса**

### Пример: super и контекст

```javascript
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
    // В момент вызова super() методы уже переопределены на дочерние
    // Но данные ещё от родительского класса (Pro)
    super();  // Вызывает Pro.constructor() с контекстом Base
    this.id = 'base';
    this.print();        // Вызывает Base.print() с контекстом Base
    super.print();       // Вызывает Pro.print() с контекстом Base
  }

  print() {
    console.log('base', this.id);
  }
}

new Base();
// Вывод:
// base pro    <- Base.print() вызван из Pro.constructor(), но this.id ещё 'pro'
// base base   <- Base.print() вызван после установки this.id = 'base'
// pro base    <- Pro.print() вызван с super.print(), но this.id уже 'base'
```

### Пошаговое объяснение

1. **new Base()** вызывается
2. **Base.constructor()** начинает выполнение
3. **super()** вызывается → выполняется **Pro.constructor()**
   - В Pro.constructor(): `this.id = 'pro'`
   - Вызывается `this.print()` → но это уже **Base.print()** (переопределён)
   - Выводит: `base pro` (Base.print видит `this.id = 'pro'`)
4. Возвращаемся в **Base.constructor()**
   - `this.id = 'base'` устанавливается
   - `this.print()` → **Base.print()** → выводит: `base base`
   - `super.print()` → **Pro.print()** → выводит: `pro base` (видит `this.id = 'base'`)

---

## Дополнительные примеры

### Переопределение методов

```javascript
class Animal {
  speak() {
    console.log('Some sound');
  }
}

class Dog extends Animal {
  speak() {
    super.speak();  // Вызывает родительский метод
    console.log('Woof!');
  }
}

const dog = new Dog();
dog.speak();
// Some sound
// Woof!
```

### Использование super в статических методах

```javascript
class Parent {
  static getType() {
    return 'Parent';
  }
}

class Child extends Parent {
  static getType() {
    return super.getType() + ' -> Child';
  }
}

console.log(Child.getType()); // "Parent -> Child"
```

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

---

## instanceof

### Описание

Оператор `instanceof` проверяет, появляется ли свойство `prototype` конструктора где-либо в **цепочке прототипов** объекта.

Это означает, что мы можем использовать его, чтобы проверить, является ли объект экземпляром данного класса или функции-конструктора.

### Синтаксис

```javascript
object instanceof Constructor
```

Возвращает `true`, если объект является экземпляром класса или функции-конструктора, и `false` в противном случае.

### Примеры

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true (наследование)
console.log(dog instanceof Object); // true (все объекты)

// С массивами
const arr = [];
console.log(arr instanceof Array);   // true
console.log(arr instanceof Object);  // true

// С примитивами
console.log(5 instanceof Number);    // false (примитив)
console.log(new Number(5) instanceof Number); // true (объект)
```

### Как работает instanceof

`instanceof` проверяет цепочку прототипов:

```javascript
function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  const prototype = Constructor.prototype;
  
  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  
  return false;
}
```

### Важные замечания

1. **Работает только с объектами** — примитивы всегда возвращают `false`
2. **Проверяет цепочку прототипов** — наследование учитывается
3. **Может быть обманут** — если `Constructor.prototype` изменён после создания объекта

### Альтернативы

```javascript
// Для проверки типа объекта
Object.prototype.toString.call([]); // '[object Array]'

// Для проверки класса (ES6+)
class MyClass {}
const obj = new MyClass();
obj.constructor === MyClass; // true

// Более надёжная проверка
Object.getPrototypeOf(obj) === MyClass.prototype; // true
```

---

## Итоговая таблица сравнения

| Характеристика | Стрелочные функции | Обычные функции |
|----------------|-------------------|-----------------|
| `this` | Лексический (наследуется) | Динамический (зависит от вызова) |
| Подходит для методов | ✅ При деструктуризации | ❌ Теряет контекст |
| Подходит для обработчиков | ✅ Всегда сохраняет this | ❌ Нужен bind |
| Можно использовать как конструктор | ❌ | ✅ |
| Есть arguments | ❌ | ✅ |
| Есть prototype | ❌ | ✅ |

---

*Для понимания прототипного наследования см. [prototypes.md](./prototypes.md)*
*Для изучения контекста выполнения см. [context-scope-variables.md](./context-scope-variables.md)*
