---
title: CDN
description: Content Delivery Network — доставка статики, кэширование на edge, снижение latency
---

# CDN (Content Delivery Network)

CDN — распределённая сеть серверов (edge nodes), которая кэширует и отдаёт статический контент ближе к пользователю.

---

## Зачем нужен CDN

- **Снижение latency** — контент отдаётся с ближайшего PoP (Point of Presence)
- **Разгрузка origin** — 80–95% запросов не доходят до основного сервера
- **Масштабирование** — CDN выдерживает пиковый трафик
- **DDoS-защита** — фильтрация на edge (Cloudflare, Akamai)

---

## Что кэшировать

| Тип | Примеры | TTL |
|-----|---------|-----|
| Статика | JS, CSS, изображения, шрифты | Долгий (дни/недели) |
| Медиа | Видео, аудио | Долгий |
| API (осторожно) | Публичные read-only данные | Короткий или не кэшировать |
| HTML | Страницы | Зависит от персонализации |

---

## Как работает

1. Пользователь запрашивает `cdn.example.com/app.js`
2. DNS направляет на ближайший edge-сервер
3. **Cache hit** — ответ из кэша edge (< 50 мс)
4. **Cache miss** — edge запрашивает у origin, кэширует, отдаёт клиенту

Заголовки: `Cache-Control`, `ETag`, `CDN-Cache-Control`.

---

## Инвалидация

- **По TTL** — кэш истекает автоматически
- **Purge / Invalidation** — принудительная очистка (после деплоя)
- **Versioned URLs** — `app.a1b2c3.js` (content hash в имени файла) — лучший подход

---

## CDN + кэширование приложения

```
Клиент → CDN (статика) → быстро
Клиент → Load Balancer → App → Redis (кэш) → DB
```

CDN дополняет, но не заменяет [стратегии кэширования](./caching-strategies) на уровне приложения.

---

## Связанные материалы

- [Стратегии кэширования](./caching-strategies)
- [Load Balancing](./load-balancing)
- [Core Web Vitals](../web/core-web-vitals) — LCP и доставка статики

[← Стратегии кэширования](./caching-strategies) | [Rate Limiting →](./rate-limiting)
