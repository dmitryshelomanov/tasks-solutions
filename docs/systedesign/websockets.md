---
title: WebSockets и SSE
description: Real-time коммуникация — WebSockets, Server-Sent Events, Long Polling
---

# WebSockets, SSE и Long Polling

Для real-time обновлений (чаты, уведомления, live-данные) HTTP request-response недостаточен. Ниже — основные подходы.

---

## Long Polling

Клиент отправляет запрос и ждёт, пока сервер не ответит (или не истечёт таймаут). После ответа — сразу новый запрос.

- Работает везде (обычный HTTP)
- Высокая задержка, нагрузка на сервер (много открытых соединений)

---

## Server-Sent Events (SSE)

Односторонний поток **сервер → клиент** поверх HTTP.

```javascript
const source = new EventSource('/api/events');
source.onmessage = (event) => console.log(event.data);
```

- Простой протокол, автоматический reconnect
- Только сервер → клиент
- Подходит: уведомления, ленты, прогресс

---

## WebSockets

Двусторонний полноценный канал поверх TCP после HTTP upgrade.

```javascript
const ws = new WebSocket('wss://example.com/ws');
ws.onmessage = (event) => console.log(event.data);
ws.send(JSON.stringify({ type: 'ping' }));
```

- Низкая latency, минимальный overhead
- Сложнее масштабировать (sticky sessions, pub/sub между серверами)
- Подходит: чаты, игры, collaborative editing

---

## Сравнение

| Критерий | Long Polling | SSE | WebSockets |
|----------|--------------|-----|------------|
| Направление | Двустороннее* | Сервер → клиент | Двустороннее |
| Протокол | HTTP | HTTP | WS (upgrade) |
| Latency | Высокая | Средняя | Низкая |
| Масштабирование | Сложное | Проще | Сложное |
| Прокси / firewall | OK | OK | Может блокироваться |

*Клиент инициирует каждый «цикл» запроса.

---

## Масштабирование WebSockets

- **Sticky sessions** — один клиент всегда на одном сервере
- **Pub/Sub** (Redis, Kafka) — серверы обмениваются сообщениями
- **Отдельный WS-gateway** — микросервис для real-time

---

## Связанные материалы

- [REST API](./rest-api) — синхронная коммуникация
- [Message Queues](./message-queues) — асинхронная доставка
- [Load Balancing](./load-balancing) — sticky sessions

[← Message Queues](./message-queues) | [Идемпотентность →](./idempotency)
