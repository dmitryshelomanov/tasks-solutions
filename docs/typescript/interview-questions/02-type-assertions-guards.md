---
title: Type Assertions и Type Guards
description: Вопрос с собеседования по TypeScript — Type Assertions и Type Guards
---

# Type Assertions и Type Guards — когда и как использовать

### Вопрос
В чем разница между type assertion (`as`) и type guard? Когда использовать каждый подход? Какие проблемы безопасности могут возникнуть при неправильном использовании type assertions?

### Ответ

**Type Assertion** (`as`) — это способ сказать TypeScript: "я знаю лучше, это определенный тип", без проверки во время выполнения.

**Type Guard** — это функция, которая выполняет проверку во время выполнения и сужает тип.

#### Type Assertions:

```typescript
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

```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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

---

[← Union и Intersection типы](./01-union-intersection) | [Conditional Types →](./03-conditional-types)
