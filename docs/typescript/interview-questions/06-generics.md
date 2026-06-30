---
title: Generics и Constraints
description: Вопрос с собеседования по TypeScript — Generics и Constraints
---

# Generics и их ограничения (Constraints)

### Вопрос
Объясните концепцию generics в TypeScript. Что такое constraints (ограничения)? Как использовать `extends` для ограничения generic типов? Приведите примеры сложных generic функций и классов.

### Ответ

**Generics** — это механизм создания переиспользуемых компонентов, которые работают с разными типами, сохраняя при этом информацию о типах.

#### Базовый синтаксис:

```typescript
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
```typescript
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
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'John', age: 30 };
const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age'); // number
// getProperty(user, 'email'); // ❌ Error: 'email' не существует
```

**3. Множественные ограничения:**
```typescript
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
```typescript
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
```typescript
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
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function callOrReturn<T>(fnOrValue: T): T extends (...args: any[]) => infer R ? R : T {
  if (typeof fnOrValue === 'function') {
    return (fnOrValue as any)();
  }
  return fnOrValue as any;
}
```

**4. Generic с default типами:**
```typescript
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

const response1: ApiResponse<User> = { /* ... */ };
const response2: ApiResponse = { data: 'anything', status: 200, message: 'OK' };
```

**5. Recursive generics:**
```typescript
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
```typescript
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
```typescript
type Mapper<T> = {
  [K in keyof T]: (value: T[K]) => T[K];
};

type User = { name: string; age: number };
type UserMapper = Mapper<User>;
// { name: (value: string) => string; age: (value: number) => number; }
```

#### Практические примеры:

**1. API клиент:**
```typescript
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
```typescript
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
```typescript
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
```typescript
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

---

[← Utility Types](./05-utility-types) | [Template Literal Types →](./07-template-literal-types)
