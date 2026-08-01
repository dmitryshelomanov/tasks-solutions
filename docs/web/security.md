---
title: Безопасность в браузере
description: XSS, CSRF, cookie-флаги HttpOnly Secure SameSite и связь с CSP
---

# Безопасность в браузере

Фронтенд-собеседования почти всегда затрагивают XSS, CSRF и cookie. Ниже — модель угроз и базовые защиты; детальная политика скриптов — в [CSP](./csp).

---

## Same-Origin Policy (кратко)

Скрипт со страницы origin A по умолчанию не читает DOM и ответы с origin B. Исключения и расширения: CORS, cookie с другим `Domain`, postMessage, и т.д. См. [CORS](./cors).

---

## XSS (Cross-Site Scripting)

Злоумышленник выполняет свой JS в контексте вашего origin → доступ к DOM, `localStorage`, cookie без `HttpOnly`, запросам от имени пользователя.

### Типы

| Тип | Идея |
|-----|------|
| Stored | Полезная нагрузка сохранена на сервере (комментарий) и отдаётся жертвам |
| Reflected | Полезная нагрузка в URL/параметре сразу отражается в ответе |
| DOM-based | Опасная сборка HTML на клиенте (`innerHTML`, опасные sink’и) |

### Защита

1. **Экранирование / безопасный рендер** — не вставлять недоверяемые строки как HTML; в React текст по умолчанию экранируется, опасен `dangerouslySetInnerHTML`
2. **CSP** — ограничить источники скриптов, запретить inline без nonce/hash — [CSP](./csp)
3. **HttpOnly cookie** — JS не украдёт session id через `document.cookie`
4. **Санитизация** HTML, если rich-text неизбежен (библиотека + жёсткий whitelist тегов)

```javascript
// Опасно
el.innerHTML = userInput;

// Безопаснее для текста
el.textContent = userInput;
```

---

## CSRF (Cross-Site Request Forgery)

Браузер сам прикладывает cookie к запросам на ваш домен. Злоумышленный сайт может инициировать запрос (`form`, `img`, иногда `fetch` с credentials), и сессионная cookie уедет на ваш API — действие от имени пользователя без его намерения.

XSS крадёт/выполняет в вашем origin; CSRF использует доверие браузера к cookie при запросе «снаружи».

### Защита

1. **SameSite cookie** — `Lax` (по умолчанию в современных браузерах) или `Strict`: cookie не уходит с большинства кросс-сайтовых запросов
2. **CSRF-токен** — секрет в форме/заголовке, который чужой origin не прочитает (SOP); сервер сверяет с сессией
3. **Проверка `Origin` / `Referer`** на state-changing запросах
4. **Не использовать cookie-only auth для API** без доп. защиты; для SPA часто bearer в памяти + аккуратная модель (тогда классический CSRF на cookie слабее, но XSS критичнее)

```http
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax; Path=/
```

---

## Cookie: важные флаги

| Флаг | Смысл |
|------|--------|
| `HttpOnly` | Недоступны из JavaScript → сильнее против XSS-кражи сессии |
| `Secure` | Только по HTTPS |
| `SameSite=Strict\|Lax\|None` | Когда cookie уходит с кросс-сайтовых запросов; `None` требует `Secure` |
| `Domain` / `Path` | Куда cookie отправляется |
| `Max-Age` / `Expires` | Срок жизни |

Сессионные cookie без `HttpOnly` + XSS = угон сессии. Cookie с `SameSite=None` нужны для кросс-сайтовых виджетов/iframe — осознанный trade-off.

Сравнение с `localStorage` / `sessionStorage`: они доступны любому JS на origin (XSS читает всё); не отправляются автоматически на сервер. См. также вопрос про хранилища в [вопросах по JS](../javascript/interview-questions#22-хранилища-в-браузере-cookie-localstorage-sessionstorage-и-indexeddb).

---

## Связка угроз

```text
XSS  → выполнение кода в вашем origin → кража token/storage, действия от пользователя
CSRF → чужой сайт провоцирует запрос с вашей cookie → нежелательное действие
CSP  → уменьшает ущерб XSS (что можно исполнить/загрузить)
CORS → кто может читать ответы API из браузера (не замена auth)
```

Авторизация на сервере обязательна всегда: CORS и CSP не заменяют проверки прав.

---

## Типичные вопросы

1. Почему `localStorage` для JWT рискованнее `HttpOnly` cookie? — любой XSS читает storage; HttpOnly cookie скрипт не видит (но нужен CSRF-defense).
2. Достаточно ли `SameSite=Lax`? — закрывает многие CSRF; для API + SPA смотрите модель auth целиком.
3. `dangerouslySetInnerHTML` в React — когда можно? — только с санитизированным HTML и пониманием CSP.

---

## Связанные материалы

- [CSP](./csp) — Content Security Policy
- [CORS](./cors) — междоменный доступ
- [HTTP и HTTPS](./http) — `Set-Cookie`, заголовки
- [Вопросы с собеседований по JS](../javascript/interview-questions) — OWASP, Cookie
