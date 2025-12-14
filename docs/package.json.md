# package.json — Основные поля и их назначение

`package.json` — это файл метаданных для Node.js проектов, который содержит информацию о проекте, его зависимостях, скриптах и конфигурации.

## Основные поля

### `name`
**Имя пакета** — уникальный идентификатор пакета в npm реестре.

```json
"name": "@super-startup/ui-kit"
```

- Должно быть уникальным в npm реестре
- Может содержать scope (префикс `@organization/`) для организации пакетов
- Используется при установке: `npm install @super-startup/ui-kit`
- Должно соответствовать правилам именования npm (lowercase, без пробелов)

### `version`
**Версия пакета** — следует семантическому версионированию (SemVer).

```json
"version": "1.0.0-beta.1"
```

Формат: `MAJOR.MINOR.PATCH[-PRERELEASE]`
- **MAJOR** — несовместимые изменения API
- **MINOR** — новая функциональность с обратной совместимостью
- **PATCH** — исправления ошибок с обратной совместимостью
- **PRERELEASE** — альфа, бета, RC версии (например, `1.0.0-beta.1`)

### `description`
**Описание пакета** — краткое описание проекта.

```json
"description": "Frontend ui kit"
```

Используется в npm реестре и при поиске пакетов.

### `type`
**Тип модуля** — определяет, как Node.js интерпретирует `.js` файлы.

```json
"type": "module"
```

- `"module"` — файлы интерпретируются как ES модули (используется `import/export`)
- `"commonjs"` (по умолчанию) — файлы интерпретируются как CommonJS (используется `require/module.exports`)
- Влияет на все `.js` файлы в проекте (кроме тех, что имеют расширение `.cjs` или `.mjs`)

### `main`
**Точка входа для CommonJS** — путь к основному файлу пакета при использовании `require()`.

```json
"main": "./dist/index.cjs"
```

- Используется при `require('@super-startup/ui-kit')`
- Должен быть CommonJS модулем (`.cjs` или `.js` при `type: "commonjs"`)

### `module`
**Точка входа для ES модулей** — путь к основному файлу пакета при использовании `import`.

```json
"module": "./dist/index.esm.js"
```

- Используется при `import ... from '@super-startup/ui-kit'`
- Должен быть ES модулем
- Бандлеры (webpack, rollup) часто предпочитают это поле `main`

### `types`
**Точка входа для TypeScript типов** — путь к файлу с определениями типов.

```json
"types": "./dist/types/index.d.ts"
```

- Используется TypeScript для автодополнения и проверки типов
- Должен указывать на `.d.ts` файл
- Альтернативное поле: `typings` (работает аналогично)

### `exports`
**Современный способ определения точек входа** — более гибкая альтернатива `main` и `module`.

```json
"exports": {
  ".": {
    "import": {
      "types": "./dist/types/index.d.mts",
      "default": "./dist/index.esm.js"
    },
    "require": {
      "types": "./dist/types/index.d.ts",
      "default": "./dist/index.cjs"
    }
  },
  "./lite": {
    "import": "./dist/lite.esm.js",
    "require": "./dist/lite.cjs"
  },
  "./button": {
    "import": "./dist/button.esm.js",
    "require": "./dist/button.cjs"
  },
  "./package.json": "./package.json"
}
```

**Преимущества `exports`:**
- Поддержка условных экспортов (разные пути для `import` и `require`)
- Поддержка подпутей (subpath exports): `import ... from '@super-startup/ui-kit/button'`
- Более строгий контроль над тем, что можно импортировать из пакета
- Поддержка TypeScript типов для каждого экспорта

**Структура:**
- `"."` — основной экспорт (корень пакета)
- `"./lite"` — подпуть для облегчённой версии
- `"./button"` — подпуть для отдельного компонента
- `"./package.json"` — экспорт самого `package.json` (полезно для доступа к метаданным)

**Условные экспорты:**
- `"import"` — используется при `import`
- `"require"` — используется при `require()`
- `"types"` — путь к TypeScript определениям для данного экспорта

### `files`
**Список файлов для публикации** — определяет, какие файлы будут включены в npm пакет.

```json
"files": [
  "dist//*",
  "!dist//*.test.*",
  "!dist/**/tests/"
]
```

- По умолчанию включаются: `package.json`, `README.md`, `LICENSE`, `main` файл
- Можно использовать glob паттерны
- `!` в начале — исключение файлов/папок
- В примере: включаются все файлы из `dist/`, кроме тестовых

### `scripts`
**NPM скрипты** — команды, которые можно запускать через `npm run <script-name>`.

```json
"scripts": {
  "build": "rollup -c",
  "prepublishOnly": "npm run build && npm test"
}
```

**Специальные хуки:**
- `prepublishOnly` — выполняется перед публикацией пакета в npm
- `prepublish`, `publish`, `postpublish` — хуки жизненного цикла публикации
- `preinstall`, `install`, `postinstall` — хуки установки
- `prepack`, `pack`, `postpack` — хуки упаковки

**Преимущества:**
- Доступ к локальным `node_modules/.bin` без указания полного пути
- Можно комбинировать команды через `&&` и `||`
- Можно использовать переменные окружения

### `author`
**Автор пакета** — информация об авторе.

```json
"author": "Candidate <candidate@super-startup.com>"
```

Может быть строкой или объектом:
```json
"author": {
  "name": "Candidate",
  "email": "candidate@super-startup.com",
  "url": "https://github.com/candidate"
}
```

### `license`
**Лицензия** — тип лицензии пакета.

```json
"license": "MIT"
```

Популярные лицензии:
- `MIT` — разрешительная лицензия
- `ISC` — упрощённая BSD-подобная лицензия
- `Apache-2.0` — Apache License 2.0
- `GPL-3.0` — GNU General Public License v3

### `repository`
**Репозиторий** — информация о репозитории с исходным кодом.

```json
"repository": {
  "type": "git",
  "url": "git+https://github.com/super-startup/ui-kit.git"
}
```

Может быть строкой:
```json
"repository": "github:super-startup/ui-kit"
```

Используется для:
- Ссылки на GitHub/GitLab в npm
- Автоматического определения баг-трекеров
- Интеграции с инструментами разработки

### `homepage`
**Домашняя страница** — URL главной страницы проекта.

```json
"homepage": "https://github.com/super-startup/ui-kit#readme"
```

Обычно указывает на README в репозитории или документацию проекта.

### `engines`
**Требования к версиям** — минимальные версии Node.js и npm.

```json
"engines": {
  "node": ">=18",
  "npm": ">=9"
}
```

- Предупреждает пользователей, если их версии не соответствуют требованиям
- Не блокирует установку (только предупреждение)
- Для строгой проверки можно использовать `.nvmrc` или CI/CD

### `dependencies`
**Зависимости** — пакеты, необходимые для работы пакета в production.

```json
"dependencies": {
  "@super-startup/ui-icons": "^18.2.0"
}
```

- Устанавливаются при `npm install`
- Включаются в финальный бандл приложения
- Используются в runtime

**Семантика версий:**
- `^18.2.0` — совместимые версии (18.2.0 до 19.0.0)
- `~18.2.0` — патч-версии (18.2.0 до 18.3.0)
- `18.2.0` — точная версия
- `>=18.2.0` — минимальная версия
- `*` — любая версия

### `devDependencies`
**Зависимости для разработки** — пакеты, необходимые только во время разработки.

```json
"devDependencies": {
  "@types/react": "^18.2.0",
  "@rollup/plugin-node-resolve": "^15.0.0",
  "jest": "^29.0.0"
}
```

- Не устанавливаются при `npm install --production`
- Не включаются в финальный бандл
- Используются для: тестирования, сборки, линтинга, типизации

### `peerDependencies`
**Пиринговые зависимости** — пакеты, которые должны быть установлены в проекте-потребителе.

```json
"peerDependencies": {
  "react": ">=16.8.0"
}
```

**Когда использовать:**
- Когда пакет является плагином или библиотекой для другого пакета
- Когда нужно избежать дублирования зависимостей (например, React должен быть один экземпляр)
- Когда версия зависимости критична для совместимости

**Особенности:**
- Не устанавливаются автоматически (только предупреждение)
- Пользователь должен установить их самостоятельно
- Используются для библиотек (UI-киты, плагины, расширения)

## Дополнительные полезные поля

### `keywords`
Массив ключевых слов для поиска в npm:
```json
"keywords": ["ui", "components", "react", "typescript"]
```

### `bugs`
URL для сообщений об ошибках:
```json
"bugs": {
  "url": "https://github.com/super-startup/ui-kit/issues"
}
```

### `funding`
Информация о спонсорстве:
```json
"funding": {
  "type": "github",
  "url": "https://github.com/sponsors/super-startup"
}
```

### `publishConfig`
Настройки публикации:
```json
"publishConfig": {
  "registry": "https://registry.npmjs.org/",
  "access": "public"
}
```

### `sideEffects`
Указывает, есть ли у пакета side effects (для tree-shaking):
```json
"sideEffects": false
```

## Рекомендации

1. **Используйте `exports` вместо `main`** для современных пакетов — это даёт больше контроля и гибкости
2. **Указывайте `engines`** — помогает пользователям понять требования
3. **Разделяйте зависимости** — `dependencies` для production, `devDependencies` для разработки
4. **Используйте `peerDependencies`** для библиотек, которые расширяют другие пакеты
5. **Указывайте `files`** — контролируйте размер пакета, исключая ненужные файлы
6. **Следуйте SemVer** — правильно версионируйте пакет для пользователей
7. **Добавляйте `types`** — поддержка TypeScript улучшает DX (developer experience)

## Примеры использования

### Импорт основного экспорта
```javascript
// ES модули
import { Button } from '@super-startup/ui-kit';

// CommonJS
const { Button } = require('@super-startup/ui-kit');
```

### Импорт подпутей
```javascript
// ES модули
import Button from '@super-startup/ui-kit/button';
import LiteKit from '@super-startup/ui-kit/lite';

// CommonJS
const Button = require('@super-startup/ui-kit/button');
```

### Доступ к package.json
```javascript
import packageJson from '@super-startup/ui-kit/package.json';
console.log(packageJson.version); // "1.0.0-beta.1"
```

---

*Документация основана на официальной спецификации npm и актуальных best practices.*
