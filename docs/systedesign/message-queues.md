# Message Queues (Очереди сообщений)

Message Queue — это механизм асинхронной коммуникации между компонентами системы. Позволяет сервисам обмениваться сообщениями без прямого соединения, обеспечивая надёжность, масштабируемость и отказоустойчивость.

---

## 🔹 Зачем нужны Message Queues?

### Проблемы синхронной коммуникации

* **Связанность сервисов**: падение одного сервиса блокирует другие
* **Медленная обработка**: нужно ждать ответа от всех сервисов
* **Пиковая нагрузка**: сервис не справляется с внезапным всплеском запросов
* **Нет буферизации**: потеря данных при перегрузке

### Преимущества Message Queues

* **Асинхронность**: сервисы не блокируют друг друга
* **Буферизация**: сообщения сохраняются до обработки
* **Масштабируемость**: можно добавить больше воркеров
* **Надёжность**: гарантия доставки, retry механизмы
* **Развязка сервисов**: сервисы не знают друг о друге напрямую

---

## 🔹 Основные концепции

### Producer (Производитель)

Сервис, который отправляет сообщения в очередь.

```python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='orders')

# Отправка сообщения
channel.basic_publish(
    exchange='',
    routing_key='orders',
    body='{"order_id": 123, "user_id": 456}'
)
```

### Consumer (Потребитель)

Сервис, который обрабатывает сообщения из очереди.

```python
def process_order(ch, method, properties, body):
    order_data = json.loads(body)
    # Обработка заказа
    print(f"Processing order {order_data['order_id']}")
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(
    queue='orders',
    on_message_callback=process_order
)
channel.start_consuming()
```

### Queue (Очередь)

Буфер, который хранит сообщения до обработки.

### Exchange (Обменник)

Маршрутизирует сообщения в нужные очереди (в RabbitMQ).

---

## 🔹 Типы очередей

### 1. Point-to-Point (Один-к-одному)

Одно сообщение обрабатывается одним потребителем.

```
Producer → Queue → Consumer 1
                  → Consumer 2 (не получит то же сообщение)
```

**Примеры**: RabbitMQ, Amazon SQS, ActiveMQ

**Когда использовать**: Задачи, которые нужно выполнить один раз

### 2. Pub/Sub (Publish-Subscribe)

Одно сообщение получают все подписчики.

```
Producer → Exchange → Queue 1 → Consumer 1
                  → Queue 2 → Consumer 2
                  → Queue 3 → Consumer 3
```

**Примеры**: Apache Kafka, Redis Pub/Sub, RabbitMQ (fanout exchange)

**Когда использовать**: Уведомления, события, логирование

---

## 🔹 Популярные Message Queues

### 1. RabbitMQ

**Тип**: Message Broker

**Особенности**:
* Гибкая маршрутизация (exchanges, routing keys)
* Поддержка различных протоколов (AMQP, MQTT, STOMP)
* Гарантия доставки
* Управляемый интерфейс

**Когда использовать**:
* Сложная маршрутизация сообщений
* Нужны гарантии доставки
* Средний объём сообщений

**Пример использования**:
```python
# Producer
channel.basic_publish(
    exchange='orders',
    routing_key='payment',
    body=json.dumps(order_data),
    properties=pika.BasicProperties(delivery_mode=2)  # Persistent
)

# Consumer
channel.basic_consume(
    queue='payment_queue',
    on_message_callback=process_payment
)
```

### 2. Apache Kafka

**Тип**: Distributed Event Streaming Platform

**Особенности**:
* Высокая пропускная способность (миллионы сообщений/сек)
* Хранение сообщений (логи)
* Горизонтальное масштабирование
* Replay сообщений

**Когда использовать**:
* Очень высокая нагрузка
* Нужно хранить историю сообщений
* Event streaming, аналитика
* Real-time data pipelines

**Пример использования**:
```python
from kafka import KafkaProducer, KafkaConsumer

# Producer
producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
producer.send('orders', value=json.dumps(order_data).encode())

# Consumer
consumer = KafkaConsumer('orders', bootstrap_servers=['localhost:9092'])
for message in consumer:
    process_order(json.loads(message.value))
```

### 3. Amazon SQS

**Тип**: Managed Message Queue (AWS)

**Особенности**:
* Полностью управляемый сервис
* Автоматическое масштабирование
* Интеграция с другими AWS сервисами
* Два типа: Standard и FIFO

**Когда использовать**:
* Используете AWS
* Не хотите управлять инфраструктурой
* Нужна интеграция с Lambda, S3 и т.д.

**Пример использования**:
```python
import boto3

sqs = boto3.client('sqs')
queue_url = 'https://sqs.us-east-1.amazonaws.com/123456789/orders'

# Отправка
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps(order_data)
)

# Получение
response = sqs.receive_message(QueueUrl=queue_url)
messages = response.get('Messages', [])
```

### 4. Redis (Pub/Sub, Lists)

**Тип**: In-Memory Data Store (может использоваться как очередь)

**Особенности**:
* Очень быстро (<1 мс)
* Простая структура данных (Lists, Pub/Sub)
* Нет гарантий доставки (по умолчанию)

**Когда использовать**:
* Низкая latency критична
* Можно допустить потерю некоторых сообщений
* Простые задачи

**Пример использования**:
```python
import redis

r = redis.Redis(host='localhost', port=6379)

# Producer (используя Lists)
r.lpush('orders', json.dumps(order_data))

# Consumer
while True:
    message = r.brpop('orders', timeout=1)
    if message:
        process_order(json.loads(message[1]))
```

---

## 🔹 Паттерны использования

### 1. Task Queue (Очередь задач)

Асинхронное выполнение тяжёлых задач.

**Пример**: Обработка изображений, отправка email, генерация отчётов

```python
# Producer
def upload_image(image_data):
    # Сохраняем изображение
    image_id = save_image(image_data)
    # Добавляем задачу в очередь
    queue.enqueue('process_image', image_id)
    return {'status': 'uploaded', 'image_id': image_id}

# Consumer (Worker)
@worker.task
def process_image(image_id):
    # Ресайз, оптимизация
    resize_image(image_id)
    generate_thumbnails(image_id)
    # Отправка уведомления
    send_notification(image_id)
```

### 2. Event-Driven Architecture

Сервисы обмениваются событиями через очередь.

**Пример**: При создании заказа → события для разных сервисов

```python
# Order Service (Producer)
def create_order(order_data):
    order = save_order(order_data)
    
    # Публикуем события
    event_bus.publish('order.created', {
        'order_id': order.id,
        'user_id': order.user_id,
        'total': order.total
    })
    return order

# Payment Service (Consumer)
@event_bus.subscribe('order.created')
def process_payment(event):
    charge_user(event['user_id'], event['total'])

# Notification Service (Consumer)
@event_bus.subscribe('order.created')
def send_confirmation(event):
    send_email(event['user_id'], f"Order {event['order_id']} created")
```

### 3. Request-Reply Pattern

Асинхронный запрос-ответ через очередь.

```python
# Client (Request)
request_id = str(uuid.uuid4())
queue.publish('requests', {
    'request_id': request_id,
    'action': 'get_user',
    'user_id': 123
})

# Ждём ответ
response = wait_for_response(request_id, timeout=5)

# Server (Reply)
@queue.subscribe('requests')
def handle_request(message):
    result = process_request(message)
    queue.publish('responses', {
        'request_id': message['request_id'],
        'result': result
    })
```

### 4. Message Buffer (Буфер сообщений)

Буферизация сообщений при высокой нагрузке.

**Пример**: Логирование, метрики, аналитика

```python
# Producer (высокая нагрузка)
def log_event(event):
    # Быстро добавляем в очередь
    queue.publish('logs', event)
    # Не блокируем основной поток

# Consumer (обрабатывает батчами)
@queue.subscribe('logs', batch_size=100)
def process_logs(events):
    # Обрабатываем батч
    db.bulk_insert('logs', events)
```

---

## 🔹 Гарантии доставки

### At-Most-Once (Максимум один раз)

Сообщение может быть потеряно, но не будет доставлено дважды.

**Когда использовать**: Некритичные данные (метрики, логи)

### At-Least-Once (Минимум один раз)

Сообщение будет доставлено хотя бы один раз (возможны дубликаты).

**Когда использовать**: Критичные данные (заказы, платежи)

**Решение дубликатов**: Идемпотентность операций

```python
def process_order(order_id):
    # Проверяем, не обработан ли уже
    if db.order_processed(order_id):
        return  # Идемпотентность
    
    # Обрабатываем
    db.mark_order_processed(order_id)
    process_payment(order_id)
```

### Exactly-Once (Ровно один раз)

Сообщение доставляется ровно один раз (сложно реализовать).

**Когда использовать**: Финансовые транзакции (редко используется из-за сложности)

---

## 🔹 Обработка ошибок

### Retry (Повторная попытка)

Автоматический повтор при ошибке.

```python
@queue.subscribe('orders', retry=3, retry_delay=5)
def process_order(message):
    try:
        # Обработка
        process_payment(message)
    except PaymentError:
        # Повторить через 5 секунд (до 3 раз)
        raise RetryException()
```

### Dead Letter Queue (DLQ)

Сообщения, которые не удалось обработать, отправляются в DLQ.

```python
# После N неудачных попыток
if retry_count >= max_retries:
    queue.publish('dead_letter_queue', message)
    # Администратор может проанализировать позже
```

### Exponential Backoff

Увеличение задержки между попытками.

```python
retry_delay = min(2 ** retry_count, 300)  # 1s, 2s, 4s, 8s... до 300s
```

---

## 🔹 Мониторинг очередей

### Ключевые метрики

* **Queue Length** — количество сообщений в очереди
* **Processing Rate** — сообщений обработано в секунду
* **Error Rate** — процент ошибок
* **Latency** — время от отправки до обработки
* **Consumer Lag** — отставание потребителей (для Kafka)

### Алерты

* Queue length > 1000 → предупреждение
* Error rate > 5% → критично
* Consumer lag > 1 минута → предупреждение

---

## 🔹 Best Practices

1. **Используйте идемпотентность**: обработка дубликатов не должна ломать систему
2. **Устанавливайте TTL**: сообщения не должны висеть вечно
3. **Мониторьте длину очереди**: предупреждение о перегрузке
4. **Используйте Dead Letter Queue**: для анализа проблемных сообщений
5. **Батчинг**: обрабатывайте сообщения батчами для эффективности
6. **Приоритизация**: важные сообщения обрабатываются первыми
7. **Graceful shutdown**: дайте воркерам завершить текущие задачи

---

---

## Навигация

[← Предыдущая: REST API](./rest-api.md) | [Следующая: Метрики и мониторинг →](./metrics.md)

