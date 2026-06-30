---
title: Type Narrowing
description: Вопрос с собеседования по TypeScript — Type Narrowing
---

# Type Narrowing (сужение типов) и его механизмы

### Вопрос
Что такое type narrowing в TypeScript? Какие механизмы используются для сужения типов? Объясните разницу между type guards, assertion functions, discriminated unions и control flow analysis.

### Ответ

**Type Narrowing** — это процесс, при котором TypeScript определяет более специфичный тип значения внутри определенной области видимости на основе проверок и анализа потока управления.

#### Механизмы type narrowing:

**1. typeof guards:**
```typescript
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

**3. in operator:**
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

**4. Equality narrowing:**
```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Если x === y, то оба должны быть string
    console.log(x.toUpperCase()); // ✅ OK
    console.log(y.toUpperCase()); // ✅ OK
  }
}
```

**5. Truthiness narrowing:**
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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

---

[← Template Literal Types](./07-template-literal-types) | [Distributive Conditional Types →](./09-distributive-conditional)
