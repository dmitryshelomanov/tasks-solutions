---
title: CORS
description: Cross-Origin Resource Sharing — simple vs preflight, заголовки, credentials и типичные ошибки
---

# CORS

**CORS** (Cross-Origin Resource Sharing) — механизм браузера: междоменные запросы из JS разрешаются только если сервер явно согласен через HTTP-заголовки. Это расширение **Same-Origin Policy (SOP)**.

**Origin** = схема + хост + порт (`https://example.com:443`). Разный порт или схема = другой origin.

---

## Зачем нужен

Без CORS страница `https://shop.com` не могла бы легитимно читать ответ API с `https://api.shop.com`. С CORS сервер API говорит: «ответы можно отдавать origin’у shop.com».

CORS **не** защищает сервер от произвольных клиентов (`curl`, Postman, бэкенд) — только ограничивает **чтение ответа в браузере** чужим JS.

---

## Simple vs preflight

### Простой запрос

Браузер сразу отправляет запрос и проверяет CORS-заголовки в ответе, если одновременно:

- Метод: `GET`, `HEAD` или `POST`
- Заголовки из «безопасного» набора (`Accept`, `Content-Type` с `text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded` и др.)
- Нет кастомных заголовков вроде `Authorization`

### Preflight (предварительный OPTIONS)

Иначе браузер сначала шлёт `OPTIONS` на тот же URL:

```http
OPTIONS /api/users HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: content-type, authorization
```

Сервер должен ответить разрешающими заголовками. Только после успеха идёт основной `PUT`/`POST`/…

Типичные триггеры preflight: `PUT`/`PATCH`/`DELETE`, `Content-Type: application/json`, заголовок `Authorization`.

---

## Ключевые заголовки ответа

| Заголовок | Назначение |
|-----------|------------|
| `Access-Control-Allow-Origin` | Какой origin допущен (`*` или конкретный). С credentials нельзя `*` |
| `Access-Control-Allow-Methods` | Методы для preflight |
| `Access-Control-Allow-Headers` | Какие request-заголовки разрешены |
| `Access-Control-Allow-Credentials` | `true` — можно cookie / auth |
| `Access-Control-Expose-Headers` | Какие response-заголовки видно JS |
| `Access-Control-Max-Age` | Сколько секунд кэшировать preflight |

```http
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Credentials (cookie, Authorization)

```javascript
fetch('https://api.example.com/me', {
  credentials: 'include',
});
```

Сервер обязан:

1. `Access-Control-Allow-Credentials: true`
2. **Конкретный** `Access-Control-Allow-Origin` (не `*`)
3. Часто ещё корректный `SameSite` / домен cookie — см. [Безопасность](./security)

---

## Типичные ошибки

| Симптом | Частая причина |
|---------|----------------|
| «blocked by CORS policy» | Нет / неверный `Allow-Origin` |
| Preflight 404/405 | Сервер не обрабатывает `OPTIONS` |
| С cookie не работает | `*` вместо конкретного origin или нет `Allow-Credentials` |
| В Postman ок, в браузере нет | Postman не применяет SOP/CORS |
| Редирект «ломает» CORS | Промежуточный ответ без CORS-заголовков |

Отладка: вкладка Network → preflight `OPTIONS` и основной запрос, смотреть request `Origin` и response `Access-Control-*`.

---

## Обход только для разработки

1. Настроить CORS на API под `localhost`
2. Dev-proxy (Vite/Webpack) — браузер ходит на same-origin, прокси на бэкенд
3. Флаги вроде `--disable-web-security` — только локально, никогда в проде

---

## Связанные материалы

- [HTTP и HTTPS](./http) — методы, OPTIONS, заголовки
- [Безопасность](./security) — XSS, CSRF, cookie
- [CSP](./csp) — политика контента
- [REST API](../systedesign/rest-api)
